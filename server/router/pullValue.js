import  { Router } from "express";
import { Product } from "../models/Product";


const pullValue = Router()

pullValue.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default pullValue 