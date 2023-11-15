import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ModalLayout from "components/modal/ModalLayout";
import CategoriesStep from "components/rent/CategoriesStep";
import { rentSchema } from "utils/validationSchema";

import { ButtonContainer, Container, Content } from "./SignUpModal";

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

  const handleBack = () => {
    setStep(value => value - 1);
  };

  const handleNext = () => {
    setStep(value => value + 1);
  };

  const formik = useFormik<{
    category: string;
    location: string;
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
      location: "",
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
    onSubmit: data => {},
  });

  const handleChange = (name: string, value: string | React.ChangeEvent<any>) => {
    formik.handleChange(name)(value);
  };

  const renderContent = (() => {
    switch (step) {
      case Steps.Category:
        return <CategoriesStep selectedCategory={formik.values.category} onChange={handleChange} />;
      default:
        return null;
    }
  })();

  return (
    <ModalLayout title={t("header.menu.yourhome")}>
      <Container>
        <Content>{renderContent}</Content>
        <ButtonContainer>
          <Button
            variant="contained"
            size="large"
            // onClick={handleSubmit}
            fullWidth
            sx={{ marginBlockStart: "32px" }}
          >
            {t("rent.next.cta")}
          </Button>
        </ButtonContainer>
      </Container>
    </ModalLayout>
  );
};

export default RentModal;
