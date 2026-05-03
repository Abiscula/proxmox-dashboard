import { useEffect, useState } from "react";
import { getDashboard } from "./services/api";
import "./App.css";

type Service = {
  id: number;
  name: string;
  type: "vm" | "container";
  status: "running" | "stopped";
  cpu: number;
  memory: number;
  uptime: number;
};

export default function App() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getDashboard().then((data) => {
      if ("services" in data) {
        setServices(data.services);
      }
    });
  }, []);

  return (
    <div className="container">
      <h1>Homelab Dashboard</h1>

      <div className="grid">
        {services.map((service) => (
          <div key={service.id} className="card">
            <div className="card-header">
              <h2>{service.name}</h2>
              <span className={`status ${service.status}`}>
                {service.status}
              </span>
            </div>

            <p>Type: {service.type}</p>
            <p>CPU: {(service.cpu * 100).toFixed(1)}%</p>
            <p>Memory: {service.memory} MB</p>
            <p>Uptime: {Math.floor(service.uptime / 60)} min</p>
          </div>
        ))}
      </div>
    </div>
  );
}