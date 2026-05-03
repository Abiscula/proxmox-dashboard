import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import https from "https";

dotenv.config();

const app = express();
const PORT = 3000;

const PROXMOX_URL = process.env.PROXMOX_URL;
const TOKEN = process.env.PROXMOX_TOKEN;
const NODE = process.env.NODE_NAME;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.get("/vms", async (req, res) => {
  try {
    const response = await fetch(
      `${PROXMOX_URL}/api2/json/nodes/${NODE}/qemu`,

      {
        headers: {
          Authorization: TOKEN,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },

        agent: agent,
      },
    );

    const data = await response.json();
    console.log(data); // debug
    res.json(data.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar VMs" });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
