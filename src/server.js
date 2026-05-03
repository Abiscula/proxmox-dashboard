import express from "express";
import dotenv from "dotenv";
import proxmoxRoutes from "./routes/proxmox.routes.js";

dotenv.config();

const app = express();

app.use("/api", proxmoxRoutes);

app.listen(3000, () => {
  console.log("Server rodando em http://localhost:3000");
});
