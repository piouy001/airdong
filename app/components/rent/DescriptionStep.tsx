"use client";

import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Heading from "../Heading";

interface Props {
  title: string;
  description: string;
  onChange: (name: string, value: string | React.ChangeEvent<any>) => void;
}

const DescriptionStep = ({ title, description, onChange }: Props): React.ReactNode => {
  const { t } = useTranslation();
  const [touched, setTouched] = useState({
    title: false,
    description: false,
  });
  return (
    <>
      <Heading title={t("rent.description.title")} description={t("rent.description.desc")} />
      <Container>
        <TextField
          variant="outlined"
          id="title"
          label={t("rent.description.title.label")}
          color="secondary"
          onChange={e => {
            setTouched(prev => ({ ...prev, title: true }));
            onChange("title", e.target.value);
          }}
          value={title}
          error={!title && touched.title}
          helperText={!title && touched.title && t("rent.description.title.error")}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          id="description"
          label={t("rent.description.desc.label")}
          color="secondary"
          onChange={e => {
            setTouched(prev => ({ ...prev, description: true }));
            onChange("description", e.target.value);
          }}
          value={description}
          error={!description && touched.description}
          helperText={!description && touched.description && t("rent.description.desc.error")}
          fullWidth
          required
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

export default DescriptionStep;
