import  { Router } from "express";
import { Product } from "../models/Product";


const createProducts = Router();

createProducts.post("/api/add/products", async (req, res) => {
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

export default createProducts;