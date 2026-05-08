import { Request, Response } from "express";
import { getContainers } from "../../services/agent/agent.service.js";

export async function handleGetContainers(_: Request, response: Response) {
  try {
    const containers = await getContainers();

    response.json(containers);
  } catch (error) {
    response.status(500).json({
      error: "Failed to fetch containers",
    });
  }
}
