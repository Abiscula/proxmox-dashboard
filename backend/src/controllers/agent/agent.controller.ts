import { Request, Response } from "express";
import {
  getContainers,
  getMemoryInfo,
} from "../../services/agent/agent.service.js";

export async function handleGetContainers(_: Request, response: Response) {
  try {
    const containers = await getContainers();

    response.json(containers);
  } catch (error) {
    response.status(500).json({
      error: "Falha ao buscar os containers Docker",
    });
  }
}

export async function handleGetMemoryInfo(_: Request, response: Response) {
  try {
    const memoryInfo = await getMemoryInfo();

    response.json(memoryInfo);
  } catch (error) {
    response.status(500).json({
      error: "Falha ao buscar informações de memória",
    });
  }
}
