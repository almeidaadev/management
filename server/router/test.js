import express, { Router } from "express";
const test = express.Router();

test.get("/", (req, res)=>{
    res.send("Hello world!")
});

export default test;
