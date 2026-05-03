import {
  getVMs,
  getContainers,
  getProxmoxStatus,
  getProxmoxStorage,
} from "../services/proxmox.service.js";
import { Request, Response } from "express";

export async function getVMsController(req: Request, res: Response) {
  try {
    const vms = await getVMs();
    res.json(vms);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getContainersController(req: Request, res: Response) {
  try {
    const containers = await getContainers();
    res.json(containers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProxmoxStatusController(req: Request, res: Response) {
  try {
    const containers = await getProxmoxStatus();
    res.json(containers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProxmoxStorageController(req: Request, res: Response) {
  try {
    const containers = await getProxmoxStorage();
    res.json(containers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
