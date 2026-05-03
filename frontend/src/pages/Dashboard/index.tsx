import { useEffect, useState } from "react";
import { getDashboard } from "../../services/api";
import type { IService } from "../../interfaces";

import { Page, Container, Header, Grid, EmptyState, Title } from "./styles";

export default function Dashboard() {
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    getDashboard().then((data) => {
      if ("services" in data) {
        setServices(data.services);
      }
    });
  }, []);

  return (
    <Page>
      <Container>
        <Header>
          <Title>Homelab Dashboard</Title>
        </Header>

        {services.length === 0 ? (
          <EmptyState>Carregando serviços...</EmptyState>
        ) : (
          <Grid>
            {services.map((service) => (
              <div key={service.id}>{service.name}</div>
            ))}
          </Grid>
        )}
      </Container>
    </Page>
  );
}