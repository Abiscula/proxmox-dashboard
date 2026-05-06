import express from "express";
import { getDashboard, getOverview } from "../controllers/controller.js";
import { getServicesStatusController } from "../controllers/service-status.controller.js";

const router = express.Router();

router.get("/dashboard", getDashboard);
router.get("/overview", getOverview);
router.get("/services-status", getServicesStatusController);

export default router;
