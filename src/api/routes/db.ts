import express from "express";
import DBController from "../controllers/dbController";

const router = express.Router();

router.route("/create/db").post(DBController.createDB);

export default router;
