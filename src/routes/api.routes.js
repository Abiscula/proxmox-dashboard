import express from "express";
import {
  getVMsController,
  getContainersController,
  getDashboard,
} from "../controllers/proxmox.controller.js";

const router = express.Router();

router.get("/", getDashboard);

export default router;
