"use client";

import styled from "@emotion/styled";
import { Avatar, Typography } from "@mui/material";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";

import SearchModal from "components/modal/SearchModal";
import { useModal } from "contexts/ModalContext";
import useCountries from "hooks/useCountries";
import BoxShadows from "styles/boxShadows";
import { Devices } from "styles/breakpoints";
import Transitions from "styles/transitions";
import { FontWeight } from "styles/typography";

const Search = (): React.ReactNode => {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) return getByValue(locationValue)?.label;

    return t("header.search.anywhere");
  }, [t, getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return t("header.search.anyweek");
  }, [t, startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) return `${guestCount} ${t("rent.info.guest.title")}`;

    return t("header.search.guests");
  }, [t, guestCount]);

  const list = [
    { label: locationLabel, isAccent: true },
    { label: durationLabel, isAccent: true },
    { label: guestLabel, hasIcon: true },
  ];

  const handleClick = () => {
    openModal({
      content: <SearchModal />,
    });
  };

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
            {locationLabel}
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
  padding-left: 16px;
`;
const MobileLabel = styled(Typography)``;

export default Search;
