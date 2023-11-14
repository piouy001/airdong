import styled from "@emotion/styled";
import { Avatar, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";

import BoxShadows from "styles/boxShadows";
import { Devices } from "styles/breakpoints";
import Transitions from "styles/transitions";
import { FontWeight } from "styles/typography";

const Search = (): React.ReactNode => {
  const { t } = useTranslation();

  const list = [
    { label: t("header.search.anywhere"), isAccent: true },
    { label: t("header.search.anyweek"), isAccent: true },
    { label: t("header.search.guests"), hasIcon: true },
  ];

  const handleClick = () => {};

  return (
    <Container onClick={handleClick}>
      {list.map((item, index) => (
        <Item key={item.label} $isEnd={index === list.length - 1}>
          <Label
            variant="body2"
            fontWeight={item.isAccent ? FontWeight.Bold : FontWeight.Regular}
            color={item.isAccent ? "text.primary" : "text.secondary"}
          >
            {item.label}
          </Label>
          {item.hasIcon && (
            <Icon sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
              <IoSearch size={16} />
            </Icon>
          )}
        </Item>
      ))}
      <MobileItem>
        <IoSearch size={20} />
        <MobileLabels>
          <MobileLabel variant="body2" fontWeight={FontWeight.SemiBold}>
            {t("header.search.anywhere")}
          </MobileLabel>
          <MobileLabel variant="subtitle1" color="text.secondary">
            {t("header.search.anyweek")} • {t("header.search.guests")}
          </MobileLabel>
        </MobileLabels>
      </MobileItem>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  width: 100%;
  height: 48px;
  padding-inline: 8px;
  border-radius: 48px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: ${BoxShadows.Primary};
  transition: box-shadow ${Transitions.Primary};
  cursor: pointer;

  &:hover {
    box-shadow: ${BoxShadows.PrimaryHover};
  }
  @media ${Devices.Desktop} {
    width: auto;
  }
`;
const Item = styled.div<{ $isEnd: boolean }>`
  display: none;
  @media ${Devices.Desktop} {
    position: relative;
    display: flex;
    align-items: center;
  }

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
const MobileItem = styled.div`
  display: flex;
  align-items: center;
  padding-inline-start: 8px;
  @media ${Devices.Desktop} {
    display: none;
  }
`;
const MobileLabels = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;
const MobileLabel = styled(Typography)``;

export default Search;
