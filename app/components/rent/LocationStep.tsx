import styled from "@emotion/styled";
import { Typography, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import useCountries, { CountryType } from "hooks/useCountries";

import Header from "./Header";

interface Props {
  selectedLocation: CountryType | null;
  onChange: (value: CountryType) => void;
}

const LocationStep = ({ selectedLocation, onChange }: Props): React.ReactNode => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { getAll } = useCountries();

  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        ssr: false,
      }),
    [selectedLocation],
  );

  return (
    <>
      <Header title={t("rent.location.title")} description={t("rent.location.desc")} />
      <Select
        placeholder={t("header.search.anywhere")}
        isClearable
        options={getAll()}
        value={selectedLocation}
        onChange={(value: any) => {
          onChange(value);
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
      <Map center={selectedLocation?.latlng} />
    </>
  );
};

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;
const MenuLabel = styled(Typography)``;

export default LocationStep;
