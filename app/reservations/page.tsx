import React from "react";

import EmptySection from "components/EmptySection";
import ReservationsSection from "components/reservations/ReservationsSection";
import { getCurrentUser } from "utils/auth";
import { getReservations } from "utils/reservations";

const ReservationsScreen = async () => {
  const user = await getCurrentUser();

  if (!user)
    return <EmptySection titleKey="reservations.userempty.title" descriptionKey="reservations.userempty.description" />;

  const reservations = await getReservations({
    authorId: user.id,
  });

  if (reservations.length === 0)
    return (
      <EmptySection
        titleKey="reservations.reservationsempty.title"
        descriptionKey="reservations.reservationsempty.description"
      />
    );

  return <ReservationsSection user={user} reservations={reservations} />;
};

export default ReservationsScreen;
