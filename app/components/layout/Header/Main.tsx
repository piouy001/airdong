"use client";

import styled from "@emotion/styled";
import React from "react";

import { Devices } from "styles/breakpoints";

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props): React.ReactNode => <Container>{children}</Container>;

const Container = styled.main`
  padding-block-start: calc(70px + 92px);
  @media ${Devices.Desktop} {
    padding-block-start: calc(80px + 92px);
  }
`;

export default Main;
