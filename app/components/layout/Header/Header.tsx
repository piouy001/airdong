"use client";

import styled from "@emotion/styled";
import React from "react";

import { Devices } from "styles/breakpoints";
import { SafeUser } from "types/user";

import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";

interface Props {
  user: SafeUser | null;
}

const Header = ({ user }: Props): React.ReactNode => (
  <Container>
    <Logo />
    <Search />
    <Menu user={user} />
  </Container>
);

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  height: 70px;
  padding-inline: 24px;
  background: ${({ theme }) => theme.palette.background.default};

  @media ${Devices.Desktop} {
    height: 80px;
    padding-inline: 40px;
    border: 1px solid ${({ theme }) => theme.palette.divider};
  }
`;

export default Header;
