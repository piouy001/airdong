import i18n from "i18n";

export const getEmailErrorMessages = (): Record<string, string> => ({
  "any.empty": i18n.t("email.required.error"),
  "string.email": i18n.t("email.valid.error"),
});

export const getNameErrorMessages = (): Record<string, string> => ({
  "any.empty": i18n.t("name.required.error"),
  "string.min": i18n.t("name.min.error"),
  "string.max": i18n.t("name.max.error"),
});

export const getPasswordErrorMessages = (): Record<string, string> => ({
  "any.empty": i18n.t("password.required.error"),
  "string.min": i18n.t("password.min.error"),
  numbers: i18n.t("password.numbers.error"),
});
