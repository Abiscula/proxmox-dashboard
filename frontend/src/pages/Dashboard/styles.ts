import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gradient.background};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  min-height: 90px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 48px;
  z-index: 1000;
  backdrop-filter: blur(16px);
  background: rgba(5, 10, 15, 0.92);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 16px 20px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HeaderRight = styled.div`
  margin-left: auto;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.2rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  margin-top: 4rem;
  ${({ theme }) => theme.colors.text.secondary}
`;

export const DockerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
`;

export const DockerHostContainer = styled.div`
  display: grid;
  justify-content: center;
  margin-bottom: 48px;

  & > div {
    width: 308px;
  }
`;

export const DockerDiagram = styled.div`
  position: relative;
`;

export const DockerConnection = styled.div`
  width: 2px;
  height: 32px;
  background: ${({ theme }) => theme.colors.docker.border};
  margin: 0 auto;
`;

export const DockerConnectionRow = styled.div`
  position: relative;
  width: 100%;
  height: 24px;
  margin-bottom: 24px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 2px;
    background: ${({ theme }) => theme.colors.docker.border};
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  margin: 32px 0 24px;
`;

export const TabButton = styled.button<{
  $active: boolean;
}>`
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: 0.2s ease;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.action.darkBtn : theme.colors.surface};

  color: ${({ theme }) => theme.colors.text.primary};

  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.action.darkBtn : theme.colors.border};

  &:hover {
    transform: translateY(-1px);
  }
`;
