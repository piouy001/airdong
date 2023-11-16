import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { isNaN, useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ModalLayout from "components/modal/ModalLayout";
import CategoriesStep from "components/rent/CategoriesStep";
import DescriptionStep from "components/rent/DescriptionStep";
import ImagesStep from "components/rent/ImagesStep";
import InfoStep from "components/rent/InfoStep";
import LocationStep from "components/rent/LocationStep";
import PriceStep from "components/rent/PricesStep";
import { useModal } from "contexts/ModalContext";
import { useSnackbar } from "contexts/SnackbarContext";
import { CountryType } from "hooks/useCountries";
import useListingsMutation from "queries/listings/useListingsMutation";
import { rentSchema } from "utils/validationSchema";

import { ButtonContainer as BaseButtonContainer, Container, Content } from "./SignUpModal";

enum Steps {
  Category,
  Location,
  Info,
  Images,
  Description,
  Price,
}

const RentModal = (): React.ReactNode => {
  const { t } = useTranslation();
  const [step, setStep] = useState(Steps.Category);
  const mutation = useListingsMutation();
  const router = useRouter();
  const { closeModal } = useModal();
  const { openSnackbar } = useSnackbar();
  const formik = useFormik<{
    category: string;
    location: CountryType | null;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    imageSrc: string;
    price: number;
    title: string;
    description: string;
  }>({
    initialValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
    validationSchema: rentSchema,
    validateOnMount: true,
    onSubmit: data => {
      mutation
        .trigger(data)
        .then(() => {
          openSnackbar({
            snackbarType: "success",
            text: t("listings.create.success"),
          });
          router.refresh();
          formik.resetForm();
          setStep(Steps.Category);
          closeModal();
        })
        .catch(() => {
          openSnackbar({
            snackbarType: "error",
            text: t("listings.create.error"),
          });
        });
    },
  });

  const getDisabled = () => {
    if (step === Steps.Description) return !formik.values.title || !formik.values.description;
    if (step === Steps.Price) return !formik.values.price || isNaN(formik.values.price);

    return false;
  };

  const handleBack = () => {
    if (step === Steps.Category) return;

    setStep(value => value - 1);
  };

  const handleNext = () => {
    if (step !== Steps.Price) {
      setStep(value => value + 1);
      return;
    }
    formik.handleSubmit();
  };

  const handleChange = (name: string, value: string | React.ChangeEvent<any>) => {
    formik.handleChange(name)(value);
  };

  const setValue = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const infos = [
    {
      name: "guestCount",
      title: t("rent.info.guest.title"),
      subtitle: t("rent.info.guest.subtitle"),
      value: formik.values.guestCount,
    },
    {
      name: "roomCount",
      title: t("rent.info.room.title"),
      subtitle: t("rent.info.room.subtitle"),
      value: formik.values.roomCount,
    },
    {
      name: "bathroomCount",
      title: t("rent.info.bathroom.title"),
      subtitle: t("rent.info.bathroom.subtitle"),
      value: formik.values.bathroomCount,
    },
  ];

  const renderContent = (() => {
    switch (step) {
      case Steps.Category:
        return <CategoriesStep selectedCategory={formik.values.category} onChange={handleChange} />;
      case Steps.Location:
        return <LocationStep selectedLocation={formik.values.location} onChange={setValue} />;
      case Steps.Info:
        return <InfoStep data={infos} onChange={setValue} />;
      case Steps.Images:
        return <ImagesStep value={formik.values.imageSrc} onChange={setValue} />;
      case Steps.Description:
        return (
          <DescriptionStep
            title={formik.values.title}
            description={formik.values.description}
            onChange={handleChange}
          />
        );
      case Steps.Price:
        return <PriceStep price={formik.values.price} onChange={handleChange} />;
      default:
        return null;
    }
  })();

  return (
    <ModalLayout title={t("header.menu.yourhome")}>
      <Container>
        <Content>{renderContent}</Content>
        <ButtonContainer>
          {step !== Steps.Category && (
            <Button variant="outlined" color="secondary" size="large" onClick={handleBack} fullWidth>
              {t("rent.back.cta")}
            </Button>
          )}
          <LoadingButton
            loading={mutation.isMutating}
            disabled={getDisabled()}
            variant="contained"
            size="large"
            onClick={handleNext}
            fullWidth
          >
            {step === Steps.Price ? t("rent.create.cta") : t("rent.next.cta")}
          </LoadingButton>
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

export default RentModal;
