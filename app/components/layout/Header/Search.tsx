"use client";

import styled from "@emotion/styled";
import { SearchOutlined } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import BoxShadows from "styles/boxShadows";
import Transitions from "styles/transitions";
import { FontWeight } from "styles/typography";

const Search = (): React.ReactNode => {
  const { t } = useTranslation();

  const list = [
    { label: t("header.search.anywhere"), onClick: () => {}, isAccent: true },
    { label: t("header.search.anyweek"), onClick: () => {}, isAccent: true },
    { label: t("header.search.guests"), onClick: () => {}, hasIcon: true },
  ];

  return (
    <Container>
      {list.map((item, index) => (
        <Item key={item.label} $isEnd={index === list.length - 1}>
          <Label
            variant="body2"
            sx={{
              fontWeight: item.isAccent ? FontWeight.Bold : FontWeight.Regular,
              color: item.isAccent ? "text.primary" : "text.secondary",
            }}
          >
            {item.label}
          </Label>
          {item.hasIcon && (
            <Icon sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
              <SearchOutlined sx={{ width: 16, height: 16 }} />
            </Icon>
          )}
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding-inline: 8px;
  border-radius: 48px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: ${BoxShadows.Primary};
  transition: box-shadow ${Transitions.Primary};
  &:hover {
    box-shadow: ${BoxShadows.PrimaryHover};
  }
`;
const Item = styled.div<{ $isEnd: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  &::after {
    content: "";
    display: ${({ $isEnd }) => ($isEnd ? "none" : "block")};
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: ${({ theme }) => theme.palette.divider};
  }
`;
const Label = styled(Typography)`
  padding-inline: 16px;
`;
const Icon = styled(Avatar)``;

export default Search;
