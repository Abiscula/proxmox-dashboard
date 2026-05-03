import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const PORT = 3000;

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});
