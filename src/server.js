import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();

app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server rodando em http://localhost:3000");
});
