import express from "express";
import proxmoxRoutes from "./proxmox.routes.js";
import apiRotes from "./api.routes.js";
import { streamState } from "../controllers/stream.controller.js";

const router = express.Router();

router.use("/proxmox", proxmoxRoutes);
router.use("/", apiRotes);
router.get("/events/state", streamState);

export default router;
