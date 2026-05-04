export function getMemoryUsagePercent(
  memory: number,
  maxMemory: number,
  memoryHost?: number,
) {
  if (!maxMemory) return 0;

  const used = memoryHost ?? memory;

  const percent = (used / maxMemory) * 100;

  return Math.min(100, Number(percent.toFixed(1)));
}
