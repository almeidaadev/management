import mongoose from "mongoose";

export const mongodb = () => {
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
};
