import styled from "styled-components";

export const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 16px;

  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.text.secondary};
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

export const Status = styled.span<{ status: "running" | "stopped" }>`
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
