import express, { Router } from "express";
import cors from "cors";
import "dotenv/config";
import { mongodb } from "./mongoDb";
import { Product } from "./models/Product";
import router from "./router/router";

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(router)

mongodb();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}
Down server with: [CTRL + C]`);
});
