"use client";

import styled from "@emotion/styled";
import { Menu as MenuIcon, Face6 } from "@mui/icons-material";
import { Avatar, Button, ClickAwayListener, Typography } from "@mui/material";
import React, { useState } from "react";

import SignUpModal from "components/auth/SignUpModal";
import { useModal } from "contexts/ModalContext";
import BoxShadows from "styles/boxShadows";
import Transitions from "styles/transitions";
import { FontWeight } from "styles/typography";

const Menu = (): React.ReactNode => {
  const { openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const menuList = [
    {
      label: "Sign Up",
      onClick: () => {
        openModal({
          title: "Sign Up",
          content: <SignUpModal />,
        });
      },
      isAccent: true,
    },
    {
      label: "Login",
      onClick: () => {},
    },
  ];

  return (
    <Container>
      <Banner color="secondary">
        <BannerLabel variant="body2">Airdong your home</BannerLabel>
      </Banner>
      <MenuContainer>
        <ClickAwayListener onClickAway={handleClose}>
          <MenuButton onClick={handleOpen} $isActive={isOpen}>
            <MenuIcon sx={{ width: 20, height: 20 }} />
            <Avatar sx={{ width: 32, height: 32, bgcolor: "text.secondary" }}>
              <Face6 sx={{ width: 28, height: 28 }} />
            </Avatar>
          </MenuButton>
        </ClickAwayListener>
        {isOpen && (
          <MenuList>
            {menuList.map(item => (
              <MenuItem
                key={item.label}
                variant="body2"
                onClick={item.onClick}
                sx={{
                  fontWeight: item.isAccent ? FontWeight.SemiBold : FontWeight.Regular,
                  color: item.isAccent ? "text.primary" : "text.secondary",
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        )}
      </MenuContainer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 0 140px;
  justify-content: flex-end;
`;
const Banner = styled(Button)`
  padding: 12px;
  border-radius: 48px;
`;
const BannerLabel = styled(Typography)``;
const MenuContainer = styled.div`
  position: relative;
`;
const MenuButton = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 8px 8px 8px 14px;
  border-radius: 48px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: ${({ $isActive }) => $isActive && BoxShadows.PrimaryHover};
  transition: box-shadow ${Transitions.Primary};
  cursor: pointer;

  &:hover {
    box-shadow: ${BoxShadows.PrimaryHover};
  }
`;
const MenuList = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  width: 240px;
  margin-block-start: 8px;
  padding-block: 12px;
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: ${BoxShadows.Primary};
  cursor: pointer;
`;
const MenuItem = styled(Typography)`
  display: block;
  width: 100%;
  padding-block: 8px;
  padding-inline: 16px;
  &:hover {
    background: ${({ theme }) => theme.palette.grey[100]};
  }
`;

export default Menu;
