import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});
