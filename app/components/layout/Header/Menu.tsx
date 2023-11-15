import styled from "@emotion/styled";
import { Avatar, Button, ClickAwayListener, IconButton, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoMenu, IoPersonSharp } from "react-icons/io5";

import LanguageModal from "components/modal/LanguageModal";
import LoginModal from "components/modal/LoginModal";
import SignUpModal from "components/modal/SignUpModal";
import { useModal } from "contexts/ModalContext";
import BoxShadows from "styles/boxShadows";
import { Devices } from "styles/breakpoints";
import Transitions from "styles/transitions";
import { FontWeight } from "styles/typography";
import { SafeUser } from "types/user";

interface Props {
  user: SafeUser | null;
}

const Menu = ({ user }: Props): React.ReactNode => {
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

  const menuList: {
    label: string;
    onClick: () => void;
    isAccent?: boolean;
    hasDivider?: boolean;
  }[] = user
    ? [
        { label: t("header.menu.trips"), onClick: () => {}, isAccent: true },
        { label: t("header.menu.wishlists"), onClick: () => {}, isAccent: true },
        { label: t("header.menu.reservations"), onClick: () => {}, isAccent: true },
        { label: t("header.menu.properties"), onClick: () => {}, isAccent: true },
        { label: t("header.menu.myhome"), onClick: () => {}, isAccent: true },
        {
          label: t("header.menu.logout"),
          onClick: () => {
            signOut();
          },
          isAccent: true,
          hasDivider: true,
        },
      ]
    : [
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
      <LanguageButton sx={{ width: 40, height: 40, color: "text.primary" }} onClick={handleLanguageClick}>
        <FaEarthAmericas size={16} />
      </LanguageButton>
      <MenuContainer>
        <ClickAwayListener onClickAway={handleClose}>
          <MenuButton onClick={handleToggle} $isActive={isOpen}>
            <IoMenu size={20} />
            <MenuAvatar sx={{ width: 32, height: 32, bgcolor: "text.secondary" }} src={user?.image ?? ""}>
              <IoPersonSharp size={20} />
            </MenuAvatar>
          </MenuButton>
        </ClickAwayListener>
        {isOpen && (
          <MenuList>
            {menuList.map(item => (
              <>
                {item.hasDivider && <Divider />}
                <MenuItem
                  key={item.label}
                  variant="body2"
                  onClick={item.onClick}
                  fontWeight={item.isAccent ? FontWeight.SemiBold : FontWeight.Regular}
                  color={item.isAccent ? "text.primary" : "text.secondary"}
                >
                  {item.label}
                </MenuItem>
              </>
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
    display: flex;
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
const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-block: 8px;
  background: ${({ theme }) => theme.palette.divider};
`;

export default Menu;
