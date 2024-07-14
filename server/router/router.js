import  { Router } from "express";
import createProducts from "./createProducts";
import test from "./test";
import pullValue from "./pullValue";
import pullPorift from "./pullProfit";
import updateProduct from "./updateProduct";

const router = Router()

router.use(createProducts);
router.use(pullValue);
router.use(test);
router.use(pullPorift);
router.use(updateProduct);

export default router;
