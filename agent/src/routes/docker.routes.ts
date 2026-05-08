import { Router } from "express";
import { DockerController } from "../controllers/docker.controller";

const dockerRoutes = Router();

dockerRoutes.get("/containers", DockerController.getContainers);

export default dockerRoutes;
