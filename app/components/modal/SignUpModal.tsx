import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";

import ModalLayout from "components/modal/ModalLayout";
import { getEmailErrorMessages, getNameErrorMessages, getPasswordErrorMessages } from "constants/errorMessage";
import { useModal } from "contexts/ModalContext";
import { useSnackbar } from "contexts/SnackbarContext";
import useSignUpMutate from "queries/auth/useSignUpMutate";
import { FontWeight } from "styles/typography";
import { emailSchema, nameSchema, passwordSchema } from "utils/validationSchema";

import LoginModal from "./LoginModal";

const signUpFormSchema = yup.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
});

const SignUpModal = (): React.ReactNode => {
  const { t } = useTranslation();
  const mutate = useSignUpMutate();
  const { closeModal, openModal } = useModal();
  const { openSnackbar } = useSnackbar();
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
    onSubmit: data => {
      mutate
        .trigger(data)
        .then(() => {
          openSnackbar({
            snackbarType: "success",
            text: t("signup.success.text"),
          });

          closeModal();
        })
        .catch(() => {
          openSnackbar({
            snackbarType: "error",
            text: t("signup.error.text"),
          });
        });
    },
  });

  const navigateToLoginScreen = () => {
    closeModal();

    openModal({
      content: <LoginModal />,
    });
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e.target.id)(e.target.value);
    formik.setFieldTouched(e.target.id, true);
  };

  return (
    <ModalLayout title={t("signup.header.title")}>
      <Container>
        <Content>
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
          </FormContainer>
        </Content>
        <ButtonContainer>
          <LoadingButton
            loading={mutate.isMutating}
            variant="contained"
            size="large"
            disabled={!formik.isValid}
            onClick={handleSubmit}
            fullWidth
            sx={{ marginBlockStart: "32px" }}
          >
            {t("signup.form.cta")}
          </LoadingButton>
          <Divider />
          <Button variant="outlined" size="large" color="secondary" fullWidth startIcon={<FcGoogle />}>
            {t("signup.form.cta.google")}
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            onClick={() => {
              signIn("github");
            }}
            fullWidth
            startIcon={<BsGithub />}
          >
            {t("signup.form.cta.github")}
          </Button>
        </ButtonContainer>
        <TextContainer>
          <Text variant="body2" color="text.secondary">
            {t("signup.form.hasaccount")}
          </Text>
          <AccentText
            variant="body2"
            color="text.primary"
            fontWeight={FontWeight.SemiBold}
            onClick={navigateToLoginScreen}
          >
            {t("signup.form.login")}
          </AccentText>
        </TextContainer>
      </Container>
    </ModalLayout>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const Content = styled.div`
  flex: 1 1 auto;
`;
export const Title = styled(Typography)`
  margin-block-end: 24px;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-block: 16px;
  background: ${({ theme }) => theme.palette.divider};
`;
export const TextContainer = styled.div`
  margin-block-start: 12px;
  text-align: center;
`;
export const Text = styled(Typography)``;
export const AccentText = styled(Text)`
  margin-inline-start: 8px;
  cursor: pointer;
`;
export default SignUpModal;
