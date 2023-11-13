import styled from "@emotion/styled";
import { Google, GitHub } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { getEmailErrorMessages, getNameErrorMessages, getPasswordErrorMessages } from "constants/errorMessage";
import { emailSchema, nameSchema, passwordSchema } from "utils/validationSchema";

const signUpFormSchema = yup.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
});

const SignUpModal = (): React.ReactNode => {
  const { t } = useTranslation();
  const formik = useFormik<{
    email: string;
    name: string;
    password: string;
  }>({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: signUpFormSchema,
    validateOnMount: true,
    onSubmit: () => {},
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e.target.id)(e.target.value);
    formik.setFieldTouched(e.target.id, true);
  };

  return (
    <Container>
      <Title variant="h3">{t("signup.form.title")}</Title>
      <FormContainer>
        <TextField
          variant="outlined"
          id="email"
          label={t("signup.form.email")}
          color="secondary"
          onChange={handleChange}
          value={formik.values.email}
          error={!!formik.errors.email && !!formik.touched.email}
          helperText={formik.errors.email && formik.touched.email && getEmailErrorMessages()[formik.errors.email]}
          fullWidth
        />
        <TextField
          variant="outlined"
          id="name"
          label={t("signup.form.name")}
          color="secondary"
          onChange={handleChange}
          value={formik.values.name}
          error={!!formik.errors.name && !!formik.touched.name}
          helperText={formik.errors.name && formik.touched.name && getNameErrorMessages()[formik.errors.name]}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="password"
          id="password"
          label={t("signup.form.password")}
          color="secondary"
          onChange={handleChange}
          value={formik.values.password}
          error={!!formik.errors.password && !!formik.touched.password}
          helperText={
            formik.errors.password && formik.touched.password && getPasswordErrorMessages()[formik.errors.password]
          }
          fullWidth
        />
        <Button
          variant="contained"
          size="large"
          disabled={!formik.isValid}
          onClick={handleSubmit}
          fullWidth
          sx={{ marginBlockStart: "24px" }}
        >
          {t("signup.form.cta")}
        </Button>
      </FormContainer>
      <ButtonContainer>
        <Button variant="outlined" size="large" color="secondary" fullWidth startIcon={<Google />}>
          {t("signup.form.cta.google")}
        </Button>
        <Button variant="outlined" size="large" color="secondary" fullWidth startIcon={<GitHub />}>
          {t("signup.form.cta.github")}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div``;
const Title = styled(Typography)`
  margin-block-end: 24px;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-block-start: 24px;
  padding-block-start: 24px;
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
`;
export default SignUpModal;
