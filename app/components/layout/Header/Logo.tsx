"use client";

import styled from "@emotion/styled";
import { Typography, useTheme } from "@mui/material";
import React from "react";

import { Logo as LogoIcon } from "assets/assetMap";

const Logo = (): React.ReactNode => {
  const { palette } = useTheme();

  return (
    <Container>
      <LogoIcon color={palette.primary.main} />
      <LogoLabel variant="h3" sx={{ color: "primary.main" }}>
        airdong
      </LogoLabel>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 140px;
`;
const LogoLabel = styled(Typography)`
  margin-left: 5px;
  letter-spacing: -1.5px;
`;

export default Logo;
