import React from "react";

import EmptySection from "components/EmptySection";
import UIBoundary from "components/UIBoundary";
import TripsSection from "components/trips/TripsSection";
import { getCurrentUser } from "utils/auth";
import { getReservations } from "utils/reservations";

const TripsScreen = async () => {
  const user = await getCurrentUser();

  if (!user)
    return (
      <UIBoundary>
        <EmptySection titleKey="trips.userempty.title" descriptionKey="trips.userempty.description" />
      </UIBoundary>
    );

  const reservations = await getReservations({
    userId: user.id,
  });

  if (reservations.length === 0)
    return (
      <UIBoundary>
        <EmptySection titleKey="trips.reservationsempty.title" descriptionKey="trips.reservationsempty.description" />
      </UIBoundary>
    );

  return (
    <UIBoundary>
      <TripsSection user={user} reservations={reservations} />
    </UIBoundary>
  );
};

export default TripsScreen;
