"use client";

import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

import Heading from "./Heading";

interface Props {
  title?: string;
  description?: string;
  showReset?: boolean;
}

const EmptySection = (props: Props): React.ReactNode => {
  const { t } = useTranslation();
  const router = useRouter();
  const title = props?.title ?? t("section.empty.title");
  const description = props?.description ?? t("section.empty.description");

  const handleReset = () => {
    router.push("/");
  };

  return (
    <Container>
      <Heading title={title} description={description} />
      {props?.showReset && (
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
