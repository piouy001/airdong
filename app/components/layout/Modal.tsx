"use client";

import { Dialog } from "@mui/material";
import React from "react";

import { useModal } from "contexts/ModalContext";

interface Props {}

const Modal = (): React.ReactNode => {
  const { state: modal, closeModal } = useModal();

  const handleClose = () => {
    closeModal();

    modal.handleClose?.();
  };

  return (
    <Dialog open={modal.open} keepMounted onClose={handleClose}>
      {modal.content}
    </Dialog>
  );
};

export default Modal;
