import { Router } from "express";
import {
  handleGetContainers,
  handleGetMemoryInfo,
} from "../controllers/agent/agent.controller.js";

const agentRoutes = Router();

agentRoutes.get("/containers", handleGetContainers);
agentRoutes.get("/memory", handleGetMemoryInfo);

export default agentRoutes;
