"use client";

import styled from "@emotion/styled";
import { usePathname } from "next/navigation";
import React from "react";

import { HOME_URL } from "constants/URLConstant";
import { Devices } from "styles/breakpoints";

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props): React.ReactNode => {
  const pathname = usePathname();
  const isMainPage = pathname === HOME_URL;

  return <Container $isMainPage={isMainPage}>{children}</Container>;
};

const Container = styled.main<{ $isMainPage: boolean }>`
  padding-block-start: ${({ $isMainPage }) => ($isMainPage ? `calc(70px + 92px)` : "70px")};
  @media ${Devices.Desktop} {
    padding-block-start: ${({ $isMainPage }) => ($isMainPage ? `calc(80px + 92px)` : "80px")};
  }
`;

export default Main;
