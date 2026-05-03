import express from "express";
import { getDashboard } from "../controllers/controller.js";

const router = express.Router();

router.get("/", getDashboard);

export default router;
