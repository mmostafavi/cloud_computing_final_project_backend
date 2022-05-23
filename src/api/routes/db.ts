import express from "express";
import DBController from "../controllers/dbController";

const router = express.Router();

router.route("/create/db").post(DBController.createDB);
router.route("/insert").post(DBController.insertOne);

export default router;
