import express from "express";
import proxmoxRoutes from "./proxmox.routes.js";
import apiRotes from "./api.routes.js";

const router = express.Router();

router.use("/proxmox", proxmoxRoutes);
router.use("/", apiRotes);

export default router;
