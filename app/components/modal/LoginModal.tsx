import { GitHub, Google } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import ModalLayout from "components/modal/ModalLayout";
import { getEmailErrorMessages, getPasswordErrorMessages } from "constants/errorMessage";
import { useModal } from "contexts/ModalContext";
import { useSnackbar } from "contexts/SnackbarContext";
import { FontWeight } from "styles/typography";
import { emailSchema, passwordSchema } from "utils/validationSchema";

import SignUpModal, {
  AccentText,
  ButtonContainer,
  Container,
  Content,
  Divider,
  FormContainer,
  TextContainer,
  Title,
} from "./SignUpModal";

const signUpFormSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

const LoginModal = (): React.ReactNode => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModal();
  const { openSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik<{
    email: string;
    password: string;
  }>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signUpFormSchema,
    validateOnMount: true,
    onSubmit: data => {
      setIsLoading(true);
      signIn("credentials", {
        ...data,
        redirect: false,
      }).then(async callback => {
        if (callback?.ok) {
          openSnackbar({
            snackbarType: "success",
            text: t("login.success.text"),
          });
          router.refresh();
          closeModal();
        }
        if (callback?.error) {
          openSnackbar({
            snackbarType: "error",
            text: t("login.error.text"),
          });
        }

        setIsLoading(false);
      });
    },
  });

  const navigateToSignUpScreen = () => {
    closeModal();

    openModal({
      content: <SignUpModal />,
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
    <ModalLayout title={t("login.header.title")}>
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
            loading={isLoading}
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
          <Button variant="outlined" size="large" color="secondary" fullWidth startIcon={<Google />}>
            {t("signup.form.cta.google")}
          </Button>
          <Button variant="outlined" size="large" color="secondary" fullWidth startIcon={<GitHub />}>
            {t("signup.form.cta.github")}
          </Button>
        </ButtonContainer>
        <TextContainer>
          <Typography variant="body2" color="text.secondary">
            {t("signup.form.signuptext")}
          </Typography>
          <AccentText
            variant="body2"
            color="text.primary"
            fontWeight={FontWeight.SemiBold}
            onClick={navigateToSignUpScreen}
          >
            {t("header.menu.signup")}
          </AccentText>
        </TextContainer>
      </Container>
    </ModalLayout>
  );
};

export default LoginModal;
