import { Router } from "express";
import { handleGetContainers } from "../controllers/agent/agent.controller.js";

const agentRoutes = Router();

agentRoutes.get("/containers", handleGetContainers);

export default agentRoutes;
