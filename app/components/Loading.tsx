"use client";

import styled from "@emotion/styled";
import { useTheme } from "@mui/material";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  const { palette } = useTheme();
  return (
    <Container>
      <PuffLoader size={100} color={palette.primary.main} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
`;

export default Loading;
