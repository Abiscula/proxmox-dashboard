export function formatDockerUptime(status: string): string {
  const normalized = status.replace("Up ", "").replace("(healthy)", "").trim();

  const matches = normalized.match(
    /(\d+)\s(day|days|hour|hours|minute|minutes)/g,
  );

  if (!matches) {
    return normalized;
  }

  let days = 0;
  let hours = 0;
  let minutes = 0;

  matches.forEach((match) => {
    const [valueStr, unit] = match.split(" ");

    const value = Number(valueStr);

    if (unit.startsWith("day")) {
      days = value;
    }

    if (unit.startsWith("hour")) {
      hours = value;
    }

    if (unit.startsWith("minute")) {
      minutes = value;
    }
  });

  const result = [];

  if (days > 0) result.push(`${days}d`);
  if (hours > 0) result.push(`${hours}h`);
  if (minutes > 0) result.push(`${minutes}m`);

  return result.join(" ");
}
