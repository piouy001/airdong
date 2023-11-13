"use client";

import styled from "@emotion/styled";
import { Close as CloseIcon } from "@mui/icons-material";
import { Dialog, IconButton, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

import { useModal } from "contexts/ModalContext";

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

const Modal = (): React.ReactNode => {
  const { state: modal, closeModal } = useModal();

  const handleClose = () => {
    closeModal();

    modal.handleClose?.();
  };

  return (
    <Wrapper open={modal.open} keepMounted TransitionComponent={Transition} onClose={handleClose}>
      <Container>
        <Header>
          <CloseButton color="secondary" onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          <Title variant="h6">{modal.title}</Title>
        </Header>
        <Content>{modal.content}</Content>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled(Dialog)`
  & .MuiPaper-root {
    border-radius: 12px;
    width: 100%;
  }
`;
const Container = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 64px;
  padding-inline: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
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
`;

export default Modal;
