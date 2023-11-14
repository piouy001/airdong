import React from "react";
import { useTranslation } from "react-i18next";

import ModalLayout from "components/modal/ModalLayout";

const LoginModal = (): React.ReactNode => {
  const { t } = useTranslation();
  return (
    <ModalLayout title={t("header.menu.login")}>
      <div>login</div>
    </ModalLayout>
  );
};

export default LoginModal;
