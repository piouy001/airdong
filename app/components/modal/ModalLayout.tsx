import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Close as CloseIcon } from "@mui/icons-material";
import { Dialog, IconButton, Typography, useMediaQuery } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

import { useModal } from "contexts/ModalContext";

interface Props {
  title?: string;
  maxWidth?: string;
  withDivider?: boolean;
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

const ModalLayout = ({ title, maxWidth, withDivider = true, children }: Props): React.ReactNode => {
  const { state: modal, closeModal } = useModal();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("desktop"));

  const handleClose = () => {
    closeModal();

    modal.handleClose?.();
  };

  return (
    <Dialog
      open={modal.open}
      keepMounted
      fullScreen={isMobile}
      TransitionComponent={Transition}
      onClose={handleClose}
      PaperProps={{
        sx: {
          maxWidth: maxWidth ?? isMobile ? "unset" : "600px",
          height: isMobile ? "100%" : "auto",
          width: "100%",
          borderRadius: "12px",
        },
      }}
    >
      <Header>
        <CloseButton color="secondary" onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        {!!title && <Title variant="h6">{title}</Title>}
      </Header>
      {withDivider && <Divider />}
      <Content>{children}</Content>
    </Dialog>
  );
};
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.palette.divider};
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  min-height: 64px;
  max-height: 64px;
  padding-inline: 24px;
`;
const CloseButton = styled(IconButton)`
  position: absolute;
  left: 12px;
  top: 16px;
  width: 32px;
  height: 32px;
`;
const Title = styled(Typography)``;
const Content = styled.div`
  padding: 24px;
  height: 100%;
`;

export default ModalLayout;
