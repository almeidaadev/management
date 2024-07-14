import { Router } from "express";
import { Product } from "../models/Product";

const pullProfit = Router();


pullProfit.get("/api/products/totals", async (req, res) => {
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

export default pullProfit
