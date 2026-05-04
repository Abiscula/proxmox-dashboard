export function getMemoryUsagePercent(memory: number, maxMemory: number) {
  if (!maxMemory) return 0;

  const percent = (memory / maxMemory) * 100;

  return Math.min(100, Number(percent.toFixed(1)));
}
