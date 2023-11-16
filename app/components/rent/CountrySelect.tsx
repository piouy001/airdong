"use client";

import styled from "@emotion/styled";
import { Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import useCountries, { CountryType } from "hooks/useCountries";

interface Props {
  value: CountryType | null;
  onChange: (name: string, value: CountryType) => void;
}

const CountrySelect = ({ value, onChange }: Props) => {
  const theme = useTheme();
  const { getAll } = useCountries();
  const { t } = useTranslation();
  return (
    <Select
      placeholder={t("header.search.anywhere")}
      isClearable
      options={getAll()}
      value={value}
      onChange={(value: any) => {
        onChange("location", value);
      }}
      formatOptionLabel={option => (
        <MenuItem>
          <MenuLabel variant="h6" sx={{ marginInlineEnd: "8px" }}>
            {option.flag}
          </MenuLabel>
          <MenuLabel variant="h6">{option.label},</MenuLabel>
          <MenuLabel variant="h6" color="text.secondary">
            {option.region}
          </MenuLabel>
        </MenuItem>
      )}
      styles={{
        control: baseStyles => ({
          ...baseStyles,
          borderWidth: "2px",
          padding: "8px",
          marginBlockEnd: "24px",
          borderRadius: "8px",
        }),
      }}
      theme={baseTheme => ({
        ...baseTheme,
        colors: {
          ...baseTheme.colors,
          primary: theme.palette.text.primary,
          primary25: theme.palette.grey[100],
        },
      })}
    />
  );
};

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;
const MenuLabel = styled(Typography)``;

export default CountrySelect;
