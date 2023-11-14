import styled from "@emotion/styled";
import { Menu as MenuIcon, Face6, Public } from "@mui/icons-material";
import { Avatar, Button, ClickAwayListener, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import LanguageModal from "components/modal/LanguageModal";
import LoginModal from "components/modal/LoginModal";
import SignUpModal from "components/modal/SignUpModal";
import { useModal } from "contexts/ModalContext";
import BoxShadows from "styles/boxShadows";
import { Devices } from "styles/breakpoints";
import Transitions from "styles/transitions";
import { FontWeight } from "styles/typography";

const Menu = (): React.ReactNode => {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageClick = () => {
    openModal({
      content: <LanguageModal />,
    });
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const menuList = [
    {
      label: t("header.menu.signup"),
      onClick: () => {
        openModal({
          content: <SignUpModal />,
        });
      },
      isAccent: true,
    },
    {
      label: t("header.menu.login"),
      onClick: () => {
        openModal({
          content: <LoginModal />,
        });
      },
    },
  ];

  return (
    <Container>
      <Banner color="secondary">
        <BannerLabel variant="body2" fontWeight={FontWeight.SemiBold}>
          {t("header.menu.yourhome")}
        </BannerLabel>
      </Banner>
      <LanguageButton sx={{ width: 40, height: 40 }} onClick={handleLanguageClick}>
        <Public sx={{ width: 16, height: 16, color: "text.primary" }} />
      </LanguageButton>
      <MenuContainer>
        <ClickAwayListener onClickAway={handleClose}>
          <MenuButton onClick={handleToggle} $isActive={isOpen}>
            <MenuIcon sx={{ width: 20, height: 20 }} />
            <MenuAvatar sx={{ width: 32, height: 32, bgcolor: "text.secondary" }}>
              <Face6 sx={{ width: 28, height: 28 }} />
            </MenuAvatar>
          </MenuButton>
        </ClickAwayListener>
        {isOpen && (
          <MenuList>
            {menuList.map(item => (
              <MenuItem
                key={item.label}
                variant="body2"
                onClick={item.onClick}
                fontWeight={item.isAccent ? FontWeight.SemiBold : FontWeight.Regular}
                color={item.isAccent ? "text.primary" : "text.secondary"}
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
`;
const Banner = styled(Button)`
  display: none;
  padding: 12px;
  border-radius: 48px;

  @media ${Devices.Desktop} {
    display: block;
  }
`;
const BannerLabel = styled(Typography)``;
const LanguageButton = styled(IconButton)`
  display: none;
  margin-inline-end: 8px;

  @media ${Devices.Desktop} {
    display: block;
  }
`;
const MenuContainer = styled.div`
  position: relative;
`;
const MenuButton = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding-inline: 14px;
  border-radius: 48px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: ${({ $isActive }) => $isActive && BoxShadows.PrimaryHover};
  transition: box-shadow ${Transitions.Primary};
  cursor: pointer;

  @media ${Devices.Desktop} {
    padding: 8px 8px 8px 14px;
  }
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
const MenuAvatar = styled(Avatar)`
  display: none;
  @media ${Devices.Desktop} {
    display: flex;
  }
`;

export default Menu;
