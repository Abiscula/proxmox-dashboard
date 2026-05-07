import styled from "styled-components";
import type { ServiceStatus } from "../../interfaces";

export const CardContainer = styled.div<{ clickable: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 16px;
  transition: 0.2s;

  &:hover {
    ${({ clickable, theme }) =>
      clickable &&
      ` cursor: pointer;
        transform: translateY(-3px);
        border-color: ${theme.colors.text.secondary};
      `}
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Status = styled.span<{ status: ServiceStatus }>`
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 6px;
  color: white;

  background: ${({ status, theme }) =>
    status === "running"
      ? theme.colors.status.running
      : theme.colors.status.stopped};
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Metric = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DiskContainer = styled.div`
  margin-top: 8px;
`;

export const DiskInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

export const DiskBar = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.border};
`;

export const DiskBarFill = styled.div<{ usage: number }>`
  height: 100%;
  width: ${({ usage }) => usage}%;
  border-radius: 999px;
  transition: width 0.3s ease;

  background: ${({ theme, usage }) => {
    if (usage >= 90) return theme.colors.status.stopped;
    if (usage >= 70) return theme.colors.status.warning;

    return theme.colors.status.running;
  }};
`;
