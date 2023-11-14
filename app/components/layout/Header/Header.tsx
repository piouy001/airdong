"use client";

import styled from "@emotion/styled";
import { User } from "@prisma/client";
import React from "react";

import { Devices } from "styles/breakpoints";

import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";

interface Props {
  user: User | null;
}

const Header = ({ user }: Props): React.ReactNode => (
  <Container>
    <Logo />
    <Search />
    <Menu user={user} />
  </Container>
);

const Container = styled.div`
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
