export function formatBytes(bytes: number): string {
  const gb = bytes / 1024 / 1024 / 1024;
  return `${gb.toFixed(1)} GB`;
}

export function bytesToMB(bytes: number): number {
  return Math.round(bytes / 1024 / 1024);
}
