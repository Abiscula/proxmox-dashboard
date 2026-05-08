import { Router } from "express";
import dockerRoutes from "./routes/docker.routes";

const routes = Router();

routes.use("/docker", dockerRoutes);

export default routes;
