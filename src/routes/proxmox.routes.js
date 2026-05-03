import express from "express";
import {
  getVMsController,
  getContainersController,
  getDashboard,
} from "../controllers/proxmox.controller.js";

const router = express.Router();

router.get("/vms", getVMsController);
router.get("/containers", getContainersController);
router.get("/dashboard", getDashboard);

export default router;
