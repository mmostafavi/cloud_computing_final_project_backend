import express from "express";
import "dotenv/config";
import cors from "cors";

// *: import routes here
// import route from "path"
// *: import routes here

// import authMiddleware from "../src/middlewares/auth";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(authMiddleware);
// app.options("*", (cors as (options: CorsOptions) => RequestHandler)());

export default app;
