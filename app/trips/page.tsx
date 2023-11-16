import React from "react";

import EmptySection from "components/EmptySection";
import TripsSection from "components/trips/TripsSection";
import { getCurrentUser } from "utils/auth";
import { getReservations } from "utils/reservations";

interface Props {}

const TripsScreen = async () => {
  const user = await getCurrentUser();

  if (!user) return <EmptySection titleKey="trips.userempty.title" descriptionKey="trips.userempty.description" />;

  const reservations = await getReservations({
    userId: user.id,
  });

  if (reservations.length === 0)
    return (
      <EmptySection titleKey="trips.reservationsempty.title" descriptionKey="trips.reservationsempty.description" />
    );

  return <TripsSection user={user} reservations={reservations} />;
};

export default TripsScreen;
