"use client";

import { useEffect } from "react";

import EmptySection from "components/EmptySection";

interface Props {
  error: Error;
}

const ErrorState = ({ error }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptySection titleKey="error.main.title" descriptionKey="error.main.description" />;
};

export default ErrorState;
