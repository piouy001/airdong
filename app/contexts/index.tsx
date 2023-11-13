import React from "react";

import { ModalContextProvider } from "./ModalContext";

type ProviderType = ({ children }: { children: React.ReactNode }) => JSX.Element;

const composeProvider = (
  contextProviders: (ProviderType | React.FC | React.ComponentClass)[],
  children: React.ReactNode,
) => contextProviders.reduce((acc, Provider) => <Provider>{acc}</Provider>, children);

const RootContextProvider = ({ children }: { children: React.ReactNode }) =>
  composeProvider([ModalContextProvider], children);

export default RootContextProvider;
