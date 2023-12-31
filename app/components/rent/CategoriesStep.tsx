"use client";

import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { categories } from "components/layout/Header/Categories";
import { Devices } from "styles/breakpoints";
import Transitions from "styles/transitions";

import Heading from "../Heading";

interface Props {
  selectedCategory?: string;
  onChange: (name: string, value: string | React.ChangeEvent<any>) => void;
}

const CategoriesStep = ({ selectedCategory, onChange }: Props): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <>
      <Heading title={t("rent.category.title")} description={t("rent.category.desc")} />
      <Categories>
        {categories.map(item => (
          <Category
            key={item.key}
            $isSelected={selectedCategory === item.key}
            onClick={() => {
              onChange("category", selectedCategory === item.key ? "" : item.key);
            }}
          >
            <item.icon size={30} />
            <Label variant="h6">{t(item.label)}</Label>
          </Category>
        ))}
      </Categories>
    </>
  );
};

const Categories = styled.div`
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-height: 50vh;
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 8px;
  }
`;
const Category = styled.div<{ $isSelected: boolean }>`
  width: calc(100% - 8px);
  padding: 16px;
  border-radius: 12px;
  border: 2px solid ${({ theme, $isSelected }) => ($isSelected ? theme.palette.text.primary : theme.palette.divider)};
  transition: border-color ${Transitions.Primary};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.palette.text.primary};
  }
  @media ${Devices.Desktop} {
    width: calc(50% - 8px);
  }
`;
const Label = styled(Typography)`
  margin-top: 8px;
`;

export default CategoriesStep;
