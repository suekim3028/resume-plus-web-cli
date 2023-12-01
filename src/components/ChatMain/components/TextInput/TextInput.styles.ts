import styled from "styled-components";

export const Input = styled.textarea`
  border: 0;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  min-height: 70px;
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.outlineVariant};
  max-height: 150px;
`;
