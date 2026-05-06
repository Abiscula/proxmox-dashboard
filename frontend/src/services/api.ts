import type { IServiceStatus, IStateEvent } from "../interfaces";

const API_URL = import.meta.env.VITE_API_URL;

export async function getDashboard() {
  const res = await fetch(`${API_URL}/api/dashboard`);
  const data = await res.json();
  return data;
}

export async function getOverviewData() {
  const res = await fetch(`${API_URL}/api/overview`);
  const data = await res.json();
  return data;
}

/**
 * Abre uma conexão SSE (Server-Sent Events) com o backend e escuta atualizações
 * em tempo real do estado da aplicação (overview + dashboard).
 *
 * @param onData Callback executado sempre que um novo evento "state" é recebido.
 * Recebe um objeto tipado com os dados mais recentes.
 *
 * @returns Função de cleanup que remove o listener e fecha a conexão SSE.
 * Deve ser usada no return do useEffect para evitar vazamentos de memória.
 *
 */
export function subscribeToState(onData: (data: IStateEvent) => void) {
  const es = new EventSource(`${API_URL}/api/events/state`);

  const handler = (event: MessageEvent) => {
    const data: IStateEvent = JSON.parse(event.data);
    onData(data);
  };

  es.addEventListener("state", handler);

  return () => {
    es.removeEventListener("state", handler);
    es.close();
  };
}

export async function getServicesStatus(): Promise<IServiceStatus[]> {
  const res = await fetch(`${API_URL}/api/services-status`);
  const data = await res.json();

  return data;
}
