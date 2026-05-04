import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 2rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.gradient.overview};
  box-shadow: 0 4px 50px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.8rem;
`;

export const Card = styled.div`
  background: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 0.8rem;

  display: flex;
  flex-direction: column;
  gap: 2px;

  backdrop-filter: blur(4px);
`;

export const Value = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Label = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
