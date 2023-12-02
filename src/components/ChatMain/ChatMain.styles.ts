import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  flex: 1;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.surface};
`;
