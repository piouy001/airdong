"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Heading from "components/Heading";
import ListingCard from "components/listings/ListingCard";
import { List } from "components/listings/ListingsSection";
import { useSnackbar } from "contexts/SnackbarContext";
import useDeleteReservationMutation from "queries/listings/useDeleteReservationMutation";
import { Devices } from "styles/breakpoints";
import { SafeReservation } from "types/reservation";
import { SafeUser } from "types/user";

interface Props {
  reservations: SafeReservation[];
  user: SafeUser | null;
}

const ReservationsSection = ({ reservations, user }: Props): React.ReactNode => {
  const { t } = useTranslation();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const { openSnackbar } = useSnackbar();
  const mutation = useDeleteReservationMutation();

  const handleCancel = (reservationId: string) => {
    setDeletingId(reservationId);

    mutation.trigger({ reservationId }).then(() => {
      mutation
        .trigger({ reservationId })
        .then(() => {
          openSnackbar({
            snackbarType: "success",
            text: t("trips.delete.success"),
          });
          router.refresh();
        })
        .catch(() => {
          openSnackbar({
            snackbarType: "error",
            text: t("trips.delete.error"),
          });
        })
        .finally(() => {
          setDeletingId("");
        });
    });
  };

  return (
    <Container>
      <Heading title={t("header.menu.reservations")} description={t("reservations.main.description")} />
      <List>
        {reservations.map(item => (
          <ListingCard
            key={item.id}
            data={item.listing}
            reservation={item}
            actionId={item.id}
            actionLabel={t("trips.delete.label")}
            onAction={handleCancel}
            disabled={deletingId === item.id}
            user={user}
          />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  padding-inline: 24px;
  padding-block-start: 16px;

  @media ${Devices.Desktop} {
    padding-inline: 40px;
    padding-block-start: 24px;
  }
`;

export default ReservationsSection;
