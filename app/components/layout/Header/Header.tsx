"use client";

import styled from "@emotion/styled";
import React from "react";

import { Devices } from "styles/breakpoints";

import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";

const Header = (): React.ReactNode => (
  <Container>
    <Logo />
    <Search />
    <Menu />
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  height: 70px;
  padding-inline: 24px;

  @media ${Devices.Desktop} {
    height: 80px;
    padding-inline: 40px;
    border: 1px solid ${({ theme }) => theme.palette.divider};
  }
`;

export default Header;
