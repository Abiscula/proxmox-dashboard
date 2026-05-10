import { useEffect, useState } from "react";
import {
  getDashboard,
  getDockerContainers,
  getOverviewData,
  subscribeToState,
} from "../../services/api";
import type {
  IDockerContainer,
  IOverviewData,
  IService,
} from "../../interfaces";

import {
  Page,
  Container,
  Header,
  Grid,
  EmptyState,
  Title,
  DockerSection,
  DockerSectionHeader,
  DockerGrid,
  DockerDiagram,
  DockerHostContainer,
  DockerConnection,
  DockerConnectionRow,
} from "./styles";
import Card from "../../components/Card";
import { orderServices } from "../../helper/orderServices";
import Overview from "../../components/Overview";
import ProxmoxIcon from "../../components/Icons/ProxmoxIcon";
import QuickAccessBar from "../../components/QuickAccessBar";
import CardDocker from "../../components/CardDocker";
import { DOCKER_VM_ID } from "../../constants";

const PROXMOX_URL = "https://proxmox.home:8006/#v1:0:=qemu%2F101:4:::::::";

export default function Dashboard() {
  const [services, setServices] = useState<IService[]>([]);
  const [overviewData, setOverviewData] = useState<IOverviewData>();
  const [containers, setContainers] = useState<IDockerContainer[]>([]);

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
   * Faz a carga inicial do overview via REST.
   * Usado para renderizar rapidamente antes do SSE começar a atualizar.
   */
  const fetchOverview = (): void => {
    getOverviewData().then(setOverviewData);
  };

  const loadContainers = () => {
    getDockerContainers().then(setContainers);
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
      setOverviewData(data.overview);
    });
  };

  useEffect(() => {
    fetchDashboard();
    fetchOverview();
    loadContainers();

    //  ---- SSE -------------------------------
    const unsubscribe = subscribeToProxmoxState();
    // encerra conexão ao desmontar o componente
    return unsubscribe;
  }, []);

  const dockerHost = services.find((service) => service.id === DOCKER_VM_ID);

  const filteredServices = services.filter(
    (service) => service.id !== DOCKER_VM_ID,
  );

  return (
    <Page>
      <Container>
        <Overview data={overviewData} />
        <QuickAccessBar />

        <Header
          onClick={() => {
            window.open(PROXMOX_URL, "_blank");
          }}
        >
          <ProxmoxIcon size={42} />
          <Title>Homelab Dashboard</Title>
        </Header>

        {services.length === 0 ? (
          <EmptyState>Carregando serviços...</EmptyState>
        ) : (
          <Grid>
            {filteredServices.map((service) => (
              <Card key={service.id} service={service} />
            ))}
          </Grid>
        )}
        <DockerSection>
          <DockerSectionHeader>🐳 VM Containers</DockerSectionHeader>

          <DockerDiagram>
            {dockerHost && (
              <DockerHostContainer>
                <Card service={dockerHost} />
              </DockerHostContainer>
            )}

            <DockerConnection />

            <DockerConnectionRow />

            <DockerGrid>
              {containers.map((container) => (
                <CardDocker key={container.id} container={container} />
              ))}
            </DockerGrid>
          </DockerDiagram>
        </DockerSection>
      </Container>
    </Page>
  );
}
