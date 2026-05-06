import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;

  padding: 0 20px;
  margin-bottom: 32px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  min-width: fit-content;
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 1.2rem;
  font-weight: 600;
`;

export const ServicesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
`;

export const ServiceButton = styled.a`
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;
