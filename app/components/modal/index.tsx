"use client";

import React from "react";

import { useModal } from "contexts/ModalContext";

const Modal = (): React.ReactNode => {
  const { state: modal } = useModal();

  return modal.content;
};

export default Modal;
