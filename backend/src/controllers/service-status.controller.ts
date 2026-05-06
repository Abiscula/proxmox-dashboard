import { Request, Response } from "express";
import { getServicesStatus } from "../services/service-status.service.js";

export async function getServicesStatusController(req: Request, res: Response) {
  try {
    const services = await getServicesStatus();

    res.json(services);
  } catch {
    res.status(500).json({
      error: "Erro ao verificar serviços",
    });
  }
}
