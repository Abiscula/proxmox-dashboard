import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;

  padding: 0 20px;
`;

export const ServicesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
`;

export const ServiceButton = styled.a`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const StatusIndicator = styled.div<{
  $isOnline: boolean;
}>`
  position: absolute;

  right: -2px;
  bottom: -2px;

  width: 10px;
  height: 10px;

  border-radius: 50%;

  background-color: ${({ theme, $isOnline }) =>
    $isOnline ? theme.colors.status.running : theme.colors.status.stopped};

  border: 2px solid ${({ theme }) => theme.colors.background};

  box-shadow: ${({ theme, $isOnline }) =>
    $isOnline ? theme.colors.effects.successGlow : "none"};

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
`;
