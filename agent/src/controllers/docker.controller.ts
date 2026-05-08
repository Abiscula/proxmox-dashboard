import { Request, Response } from "express";
import { DockerService } from "../services/docker.service";

export class DockerController {
  static async getContainers(_: Request, response: Response) {
    try {
      const containers = await DockerService.getContainers();

      response.json(containers);
    } catch (error) {
      response.status(500).json({
        error: "Failed to fetch docker containers",
      });
    }
  }
}
