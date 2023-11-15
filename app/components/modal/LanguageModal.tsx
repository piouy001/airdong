"use client";

import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { LANGUAGE_STORAGE_KEY } from "constants/language";
import { useModal } from "contexts/ModalContext";
import i18n from "i18n";
import { Devices } from "styles/breakpoints";

import ModalLayout from "./ModalLayout";

const LanguageModal = (): React.ReactNode => {
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const languages = [
    { label: "English", country: "United States", value: "en" },
    { label: "한국어", country: "대한민국", value: "ko" },
  ];

  const handleClick = (value: string) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
    i18n.changeLanguage(value);

    closeModal();
  };

  return (
    <ModalLayout withDivider={false} maxWidth="100%">
      <Title variant="h3">{t("header.language.title")}</Title>
      <List>
        {languages.map(item => (
          <Item
            key={item.value}
            $isActive={item.value === i18n.language}
            onClick={() => {
              handleClick(item.value);
            }}
          >
            <Label variant="body2" color="text.primary">
              {item.label}
            </Label>
            <Label variant="body2" color="text.secondary">
              {item.country}
            </Label>
          </Item>
        ))}
      </List>
    </ModalLayout>
  );
};

const Title = styled(Typography)`
  margin-block-end: 24px;
`;
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
`;
const Item = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  width: calc(33% - 8px);
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ $isActive, theme }) => ($isActive ? theme.palette.text.primary : theme.palette.background.default)};
  cursor: pointer;
  @media ${Devices.Desktop} {
    width: calc(20% - 8px);
  }
  &:hover {
    border: 1px solid ${({ $isActive, theme }) => ($isActive ? theme.palette.text.primary : theme.palette.grey[100])};
    background: ${({ theme }) => theme.palette.grey[100]};
  }
`;
const Label = styled(Typography)``;

export default LanguageModal;
