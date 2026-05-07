import express from "express";
import {
  getVMsController,
  getContainersController,
  getProxmoxStatusController,
  getProxmoxStorageController,
  getVMFileSystemController,
} from "../controllers/proxmox.controller.js";

const router = express.Router();

router.get("/vms", getVMsController);
router.get("/containers", getContainersController);
router.get("/status", getProxmoxStatusController);
router.get("/storage", getProxmoxStorageController);
router.get("/vms/:vmid/fsinfo", getVMFileSystemController);

export default router;
