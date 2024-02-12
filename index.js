#!/usr/bin/env node
import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.js";
import usersRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cors({
  origin: ["https://sneakers-48gn.onrender.com"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(cookieParser())
app.use("/products", productRoutes);
app.use("/users", usersRoutes)
app.listen(8800);
