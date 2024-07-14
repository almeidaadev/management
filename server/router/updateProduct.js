import { Router } from "express";
import { Product } from "../models/Product";

const updateProduct = Router();

updateProduct.put("/api/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        const { salePrice } = req.body;

        product.salePrice = salePrice;

        res.json(product);
    } catch (err) {
        console.error(err);
    }
});

export default updateProduct;
