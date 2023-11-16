"use client";

import styled from "@emotion/styled";
import React from "react";

import BoxShadows from "styles/boxShadows";
import { Devices } from "styles/breakpoints";
import { SafeUser } from "types/user";

import Categories from "./Categories";
import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";

interface Props {
  user: SafeUser | null;
}

const Header = ({ user }: Props): React.ReactNode => (
  <Container>
    <Content>
      <Logo />
      <Search />
      <Menu user={user} />
    </Content>
    <Categories />
  </Container>
);

const Container = styled.header`
  position: fixed;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: ${BoxShadows.Primary};
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
