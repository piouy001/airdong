"use client";

import { Alert, Snackbar as MuiSnackbar } from "@mui/material";
import React from "react";

import { useSnackbar } from "contexts/SnackbarContext";

const Snackbar = (): React.ReactNode => {
  const { state: snackbar, closeSnackbar } = useSnackbar();

  const handleClose = () => {
    closeSnackbar();

    snackbar.handleClose?.();
  };

  if (!snackbar.open) return;

  return (
    <MuiSnackbar
      open={snackbar.open}
      autoHideDuration={1000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={snackbar.snackbarType ?? "error"} variant="filled" elevation={6}>
        {snackbar.text}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
