"use client";

import React, { useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const UIBoundary = ({ children }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return children;
};

export default UIBoundary;
