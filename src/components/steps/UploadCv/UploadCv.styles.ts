import styled from "styled-components";

export const PdfFileInput = styled.input`
  display: flex;
  margin-top: 10px;

  width: 200px;
  align-items: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.GRAY_100};
  border-radius: 8px;
`;
