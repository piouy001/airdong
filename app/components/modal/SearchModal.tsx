import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useState, useMemo, useCallback } from "react";
import { Range } from "react-date-range";
import { useTranslation } from "react-i18next";

import Heading from "components/Heading";
import Calendar from "components/listings/Calendar";
import ModalLayout from "components/modal/ModalLayout";
import Counter from "components/rent/Counter";
import CountrySelect from "components/rent/CountrySelect";
import { HOME_URL } from "constants/URLConstant";
import { useModal } from "contexts/ModalContext";
import { useSnackbar } from "contexts/SnackbarContext";
import { CountryType } from "hooks/useCountries";

import { ButtonContainer as BaseButtonContainer, Container, Content } from "./SignUpModal";

enum Steps {
  Location,
  Date,
  Info,
}

const SearchModal = (): React.ReactNode => {
  const { t } = useTranslation();
  const params = useSearchParams();
  const router = useRouter();
  const { closeModal, openModal } = useModal();
  const { openSnackbar } = useSnackbar();
  const [step, setStep] = useState(Steps.Location);
  const [location, setLocation] = useState<CountryType | null>(null);
  const [info, setInfo] = useState({
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
  });
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location],
  );

  const handleBack = () => {
    if (step === Steps.Location) return;

    setStep(value => value - 1);
  };

  const handleNext = () => {
    if (step !== Steps.Info) {
      setStep(value => value + 1);
      return;
    }
    handleSubmit();
  };

  const handleSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount: info.guestCount,
      roomCount: info.roomCount,
      bathroomCount: info.bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: HOME_URL,
        query: updatedQuery,
      },
      { skipNull: true },
    );

    setStep(Steps.Location);
    closeModal();
    router.push(url);
  }, [closeModal, location, router, info, dateRange, params]);

  const infos = [
    {
      name: "guestCount",
      title: t("rent.info.guest.title"),
      subtitle: t("rent.info.guest.subtitle"),
      value: info.guestCount,
    },
    {
      name: "roomCount",
      title: t("rent.info.room.title"),
      subtitle: t("rent.info.room.subtitle"),
      value: info.roomCount,
    },
    {
      name: "bathroomCount",
      title: t("rent.info.bathroom.title"),
      subtitle: t("rent.info.bathroom.subtitle"),
      value: info.bathroomCount,
    },
  ];

  const renderContent = (() => {
    switch (step) {
      case Steps.Location:
        return (
          <>
            <Heading title={t("search.main.title")} description={t("search.main.description")} />
            <CountrySelect
              value={location}
              onChange={(name: string, value: CountryType) => {
                setLocation(value as CountryType);
              }}
            />
            <Map center={location?.latlng} />
          </>
        );
      case Steps.Date:
        return (
          <>
            <Heading title={t("search.date.title")} description={t("search.date.description")} />
            <Calendar value={dateRange} onChange={value => setDateRange(value.selection)} />
          </>
        );
      case Steps.Info:
        return (
          <>
            <Heading title={t("search.info.title")} description={t("search.info.description")} />
            {infos.map(item => (
              <Counter
                key={item.name}
                name={item.name}
                title={item.name}
                subtitle={item.subtitle}
                value={item.value}
                onChange={(name: string, value) => {
                  setInfo(prev => ({
                    ...prev,
                    [name]: value,
                  }));
                }}
              />
            ))}
          </>
        );
      default:
        return null;
    }
  })();

  return (
    <ModalLayout title={t("search.header.title")}>
      <Container>
        <Content>{renderContent}</Content>
        <ButtonContainer>
          {step !== Steps.Location && (
            <Button variant="outlined" color="secondary" size="large" onClick={handleBack} fullWidth>
              {t("rent.back.cta")}
            </Button>
          )}
          <Button variant="contained" size="large" onClick={handleNext} fullWidth>
            {step === Steps.Info ? t("rent.create.cta") : t("rent.next.cta")}
          </Button>
        </ButtonContainer>
      </Container>
    </ModalLayout>
  );
};

const ButtonContainer = styled(BaseButtonContainer)`
  display: flex;
  flex-direction: row;
  margin-block-start: 32px;
`;

export default SearchModal;
