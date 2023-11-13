"use client";

import styled from "@emotion/styled";
import { Menu as MenuIcon, Face6 } from "@mui/icons-material";
import { Avatar, Button, Typography } from "@mui/material";
import React from "react";

import BoxShadows from "styles/boxShadows";
import Transitions from "styles/transitions";

const Menu = (): React.ReactNode => (
  <Container>
    <Banner color="secondary">
      <BannerLabel variant="body2">Airdong your home</BannerLabel>
    </Banner>
    <MenuContainer>
      <MenuIcon sx={{ width: 20, height: 20 }} />
      <Avatar sx={{ width: 32, height: 32, bgcolor: "text.secondary" }}>
        <Face6 sx={{ width: 28, height: 28 }} />
      </Avatar>
    </MenuContainer>
  </Container>
);
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 0 140px;
  justify-content: flex-end;
`;
const Banner = styled(Button)`
  padding: 12px;
  border-radius: 48px;
`;
const BannerLabel = styled(Typography)``;
const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 8px 8px 8px 14px;
  border-radius: 48px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  transition: box-shadow ${Transitions.Primary};
  cursor: pointer;
  &:hover {
    box-shadow: ${BoxShadows.PrimaryHover};
  }
`;

export default Menu;
