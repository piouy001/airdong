"use client";

import styled from "@emotion/styled";
import { useTheme } from "@mui/material";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "hooks/useFavorite";
import Transitions from "styles/transitions";
import { SafeUser } from "types/user";

interface Props {
  listingId: string;
  user: SafeUser | null;
}

const FavoriteButton = ({ listingId, user }: Props): React.ReactNode => {
  const { hasFavorited, toggleFavorite } = useFavorite({ listingId, user });
  const { palette } = useTheme();

  return (
    <Button onClick={toggleFavorite}>
      <IconContainer>
        <AiOutlineHeart size={28} color={palette.background.default} />
      </IconContainer>
      <AiFillHeart size={24} color={hasFavorited ? palette.primary.main : palette.text.secondary} />
    </Button>
  );
};

const Button = styled.div`
  position: relative;

  transition: opacity ${Transitions.Primary};
  &:hover {
    opacity: 0.8;
  }
`;
const IconContainer = styled.div`
  display: flex;
  position: absolute;
  right: -2px;
  top: -2px;
`;

export default FavoriteButton;
