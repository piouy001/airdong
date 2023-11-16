"use client";

import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CountryType } from "hooks/useCountries";

import CountrySelect from "./CountrySelect";
import Heading from "../Heading";

interface Props {
  selectedLocation: CountryType | null;
  onChange: (name: string, value: CountryType) => void;
}

const LocationStep = ({ selectedLocation, onChange }: Props): React.ReactNode => {
  const { t } = useTranslation();

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [selectedLocation],
  );

  return (
    <>
      <Heading title={t("rent.location.title")} description={t("rent.location.desc")} />
      <CountrySelect value={selectedLocation} onChange={onChange} />
      <Map center={selectedLocation?.latlng} />
    </>
  );
};

export default LocationStep;
