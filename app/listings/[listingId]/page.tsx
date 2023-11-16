import React from "react";

import EmptySection from "components/EmptySection";
import ListingSection from "components/listings/ListingSection";
import { getCurrentUser } from "utils/auth";
import { getListingById } from "utils/listings";
import { getReservations } from "utils/reservations";

interface Props {
  params: {
    listingId?: string;
  };
}

const ListingScreen = async ({ params }: Props) => {
  const listing = await getListingById(params);
  const user = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) return <EmptySection />;

  return <ListingSection listing={listing} user={user} reservations={reservations} />;
};

export default ListingScreen;
