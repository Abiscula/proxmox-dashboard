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
