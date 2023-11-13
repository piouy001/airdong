"use client";

import { produce } from "immer";
import React, { Dispatch, ReactNode, useCallback, useContext, useReducer } from "react";

interface ModalProps {
  title: string | null;
  content: ReactNode | null;
  handleClose?: () => void;
}
interface ModalState extends ModalProps {
  open: boolean;
}
interface OpenModalType extends ModalProps {
  type: "openModal";
}
type ModalDispatch = Dispatch<Action>;

const ModalContext = React.createContext<ModalState | undefined>(undefined);
const ModalDispatchContext = React.createContext<ModalDispatch | undefined>(undefined);

type Action = OpenModalType | { type: "closeModal" };

const modalReducer = produce((draft: ModalState, action: Action) => {
  switch (action.type) {
    case "openModal":
      draft.open = true;
      draft.content = action.content;
      draft.title = action.title;
      draft.handleClose = action.handleClose;
      break;
    case "closeModal":
      draft.open = false;
      draft.title = null;
      draft.content = null;
      break;
    default:
  }
});

export const ModalContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
    title: null,
    content: null,
    handleClose: undefined,
  });

  return (
    <ModalDispatchContext.Provider value={dispatch}>
      <ModalContext.Provider value={state}>{children}</ModalContext.Provider>
    </ModalDispatchContext.Provider>
  );
};

export const useModal = () => {
  const state = useContext(ModalContext);
  if (!state) {
    throw new Error("ModalContextProvider not found");
  }

  const dispatch = useContext(ModalDispatchContext);
  const openModal = useCallback(
    (params: ModalProps) => dispatch && dispatch({ type: "openModal", ...params }),
    [dispatch],
  );
  const closeModal = useCallback(() => dispatch && dispatch({ type: "closeModal" }), [dispatch]);

  return { state, openModal, closeModal };
};
