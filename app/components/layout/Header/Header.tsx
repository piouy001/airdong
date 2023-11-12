"use client";

import styled from "@emotion/styled";
import { Typography, useTheme } from "@mui/material";
import React from "react";

import { Logo } from "assets/assetMap";

import Profile from "./Profile";
import Search from "./Search";

const Header = (): React.ReactNode => {
  const { palette } = useTheme();

  return (
    <Wrapper>
      <LogoContainer>
        <Logo color={palette.primary.main} />
        <LogoLabel variant="h3">airdong</LogoLabel>
      </LogoContainer>
      <Search />
      <Profile />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding-inline: 40px;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const LogoLabel = styled(Typography)`
  margin-left: 5px;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
  letter-spacing: -1px;
  ${({ theme }) => theme.breakpoints.down("md")}
`;

export default Header;
