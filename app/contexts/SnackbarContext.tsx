"use client";

import { produce } from "immer";
import React, { Dispatch, ReactNode, useCallback, useContext, useReducer } from "react";

interface SnackbarProps {
  snackbarType: "error" | "warning" | "info" | "success" | null;
  text: ReactNode | null;
  handleClose?: () => void;
}
interface SnackbarState extends SnackbarProps {
  open: boolean;
}
interface OpenSnackbarType extends SnackbarProps {
  type: "openSnackbar";
}
type SnackbarDispatch = Dispatch<Action>;

const SnackbarContext = React.createContext<SnackbarState | undefined>(undefined);
const SnackbarDispatchContext = React.createContext<SnackbarDispatch | undefined>(undefined);

type Action = OpenSnackbarType | { type: "closeSnackbar" };

const snackbarReducer = produce((draft: SnackbarState, action: Action) => {
  switch (action.type) {
    case "openSnackbar":
      draft.open = true;
      draft.snackbarType = action.snackbarType;
      draft.text = action.text;
      draft.handleClose = action.handleClose;
      break;
    case "closeSnackbar":
      draft.open = false;
      draft.snackbarType = null;
      draft.text = null;
      break;
    default:
  }
});

export const SnackbarContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(snackbarReducer, {
    open: false,
    snackbarType: null,
    text: null,
    handleClose: undefined,
  });

  return (
    <SnackbarDispatchContext.Provider value={dispatch}>
      <SnackbarContext.Provider value={state}>{children}</SnackbarContext.Provider>
    </SnackbarDispatchContext.Provider>
  );
};

export const useSnackbar = () => {
  const state = useContext(SnackbarContext);
  if (!state) {
    throw new Error("SnackbarContextProvider not found");
  }

  const dispatch = useContext(SnackbarDispatchContext);
  const openSnackbar = useCallback(
    (params: SnackbarProps) => dispatch && dispatch({ type: "openSnackbar", ...params }),
    [dispatch],
  );
  const closeSnackbar = useCallback(() => dispatch && dispatch({ type: "closeSnackbar" }), [dispatch]);

  return { state, openSnackbar, closeSnackbar };
};
