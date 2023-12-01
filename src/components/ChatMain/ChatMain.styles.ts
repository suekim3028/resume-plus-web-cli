import { Layout } from "@design-system";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  justify-content: flex-end;
  overflow-y: scroll;
  padding: 10px 20px 0px;
  background-color: ${({ theme }) => theme.surface};
`;
