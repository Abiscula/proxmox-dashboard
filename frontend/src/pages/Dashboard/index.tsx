import { useEffect, useState } from "react";
import { getDashboard, subscribeToState } from "../../services/api";
import type { IService } from "../../interfaces";

import { Page, Container, Header, Grid, EmptyState, Title } from "./styles";
import Card from "../../components/Card";
import { orderServices } from "../../helper/orderServices";
import Overview from "../../components/Overview";
import ProxmoxIcon from "../../components/Icons/ProxmoxIcon/indes";

export default function Dashboard() {
  const [services, setServices] = useState<IService[]>([]);

  /**
   * Faz a carga inicial do dashboard via REST.
   * Usado para renderizar rapidamente antes do SSE começar a atualizar.
   */
  const fetchDashboard = (): void => {
    getDashboard().then((data) => {
      if ("services" in data) {
        setServices(orderServices(data.services));
      }
    });
  };

  /**
   * Abre a conexão SSE para receber atualizações em tempo real
   * do estado do Proxmox (overview + dashboard).
   *
   * Retorna a função de cleanup para encerrar a conexão.
   */
  const subscribeToProxmoxState = () => {
    return subscribeToState((data) => {
      setServices(orderServices(data.dashboard.services));
    });
  };

  useEffect(() => {
    fetchDashboard();

    const unsubscribe = subscribeToProxmoxState();

    // encerra conexão ao desmontar o componente
    return unsubscribe;
  }, []);

  return (
    <Page>
      <Container>
        <Overview />

        <Header>
          <ProxmoxIcon size={42} />
          <Title>Homelab Dashboard</Title>
        </Header>

        {services.length === 0 ? (
          <EmptyState>Carregando serviços...</EmptyState>
        ) : (
          <Grid>
            {services.map((service) => (
              <Card key={service.id} service={service} />
            ))}
          </Grid>
        )}
      </Container>
    </Page>
  );
}
