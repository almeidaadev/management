import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
    .connect("mongodb://localhost:27017/productDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    purchasePrice: Number,
    salePrice: Number,
    profit: Number,
});

// Product Model
const Product = mongoose.model("Product", productSchema);

// Router for source of server
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Routes for add new product
app.post("/api/products", async (req, res) => {
    try {
        const { name, purchasePrice, salePrice } = req.body;
        const profit = salePrice - purchasePrice;

        const product = new Product({
            name,
            purchasePrice,
            salePrice,
            profit,
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Router for get all products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Router for calcule the tatlas of purchase and sale and profit the product
app.get("/api/products/totals", async (req, res) => {
    try {
        const products = await Product.find();
        let totalPurchase = 0;
        let totalSale = 0;
        let totalProfit = 0;

        products.forEach((product) => {
            totalPurchase += product.purchasePrice;
            totalSale += product.salePrice;
            totalProfit += product.profit;
        });

        const totals = {
            totalPurchase,
            totalSale,
            totalProfit,
        };

        res.status(200).json(totals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/test", async (req, res) => {
    const response = await fetch("http://localhost:8081/api/products/totals");
    const userData = await response.json();

    const { totalPurchase, totalSale, totalProfit } = userData;

    console.log(
        // Total  pago
        totalPurchase,
        // Total  vendido
        totalSale,
        // lucro
        totalProfit
    );
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}
Down server with: [CTRL + C]`);
});
