import express from "express";
import {
  getVMsController,
  getContainersController,
} from "../controllers/proxmox.controller.js";

const router = express.Router();

router.get("/vms", getVMsController);
router.get("/containers", getContainersController);

export default router;
