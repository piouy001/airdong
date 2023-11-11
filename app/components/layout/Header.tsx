"use client";

import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

import Logo from "assets/Logo";

const Header = (): React.ReactNode => (
  <div>
    <Box sx={{ background: "red" }}>
      <Logo />
    </Box>
  </div>
);

const Test = styled.div`
  border: 4px solid ${({ theme }) => theme.palette.primary.main};
`;

export default Header;
