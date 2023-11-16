"use client";

import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

import { HOME_URL } from "constants/URLConstant";

import Heading from "./Heading";

interface Props {
  titleKey?: string;
  descriptionKey?: string;
  showReset?: boolean;
}

const EmptySection = ({ titleKey, descriptionKey, showReset }: Props): React.ReactNode => {
  const { t } = useTranslation();
  const router = useRouter();
  const title = titleKey ? t(titleKey) : t("section.empty.title");
  const description = descriptionKey ? t(descriptionKey) : t("section.empty.description");

  const handleReset = () => {
    router.push(HOME_URL);
  };

  return (
    <Container>
      <Heading title={title} description={description} />
      {showReset && (
        <ResetButton variant="outlined" size="large" color="secondary" onClick={handleReset}>
          Remove all filters
        </ResetButton>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  text-align: center;
`;
const ResetButton = styled(Button)``;

export default EmptySection;
