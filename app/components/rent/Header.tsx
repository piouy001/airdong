import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React from "react";

import { FontWeight } from "styles/typography";

interface Props {
  title: string;
  description: string;
}

const Header = ({ title, description }: Props): React.ReactNode => (
  <>
    <Title variant="h3">{title}</Title>
    <Description variant="h6" color="text.secondary" fontWeight={FontWeight.Regular}>
      {description}
    </Description>
  </>
);

const Title = styled(Typography)`
  margin-block-end: 8px;
`;
const Description = styled(Typography)`
  margin-block-end: 24px;
`;

export default Header;
