import React from "react";

import EmptySection from "components/EmptySection";
import UIBoundary from "components/UIBoundary";
import ReservationsSection from "components/reservations/ReservationsSection";
import { getCurrentUser } from "utils/auth";
import { getReservations } from "utils/reservations";

const ReservationsScreen = async () => {
  const user = await getCurrentUser();

  if (!user)
    return (
      <UIBoundary>
        <EmptySection titleKey="reservations.userempty.title" descriptionKey="reservations.userempty.description" />
      </UIBoundary>
    );

  const reservations = await getReservations({
    authorId: user.id,
  });

  if (reservations.length === 0)
    return (
      <UIBoundary>
        <EmptySection
          titleKey="reservations.reservationsempty.title"
          descriptionKey="reservations.reservationsempty.description"
        />
      </UIBoundary>
    );

  return (
    <UIBoundary>
      <ReservationsSection user={user} reservations={reservations} />
    </UIBoundary>
  );
};

export default ReservationsScreen;
