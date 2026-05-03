import express from "express";
import {
  getVMsController,
  getContainersController,
  getProxmoxStatusController,
} from "../controllers/proxmox.controller.js";

const router = express.Router();

router.get("/vms", getVMsController);
router.get("/containers", getContainersController);
router.get("/status", getProxmoxStatusController);

export default router;
