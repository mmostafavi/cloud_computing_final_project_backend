import express from "express";
import "dotenv/config";
import cors from "cors";

// *: import routes here
import authRoutes from "./api/routes/auth";
import dbRoutes from "./api/routes/db";

// *: import routes here

import authMiddleware from "../src/middlewares/auth";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authMiddleware);
// app.options("*", (cors as (options: CorsOptions) => RequestHandler)());

app.use("/auth", authRoutes);
app.use("/db", dbRoutes);

export default app;
