import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.gradient.background};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 2rem;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
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

export const DockerSection = styled.section`
  margin-top: 3rem;
`;

export const DockerSectionHeader = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 24px;
  padding-bottom: 16px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  font-size: 1.1rem;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.text.primary};
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
