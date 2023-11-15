import styled from "@emotion/styled";
import { Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import { Logo as LogoIcon } from "assets/assetMap";
import { Devices } from "styles/breakpoints";

const Logo = (): React.ReactNode => {
  const { palette } = useTheme();
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <Container onClick={handleClick}>
      <LogoIcon color={palette.primary.main} />
      <LogoLabel variant="h3" color="primary.main">
        airdong
      </LogoLabel>
    </Container>
  );
};

const Container = styled.div`
  display: none;

  @media ${Devices.Desktop} {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;
const LogoLabel = styled(Typography)`
  margin-left: 5px;
  letter-spacing: -1.5px;
`;

export default Logo;
