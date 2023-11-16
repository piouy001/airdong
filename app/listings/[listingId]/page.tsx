import React from "react";

import EmptySection from "components/EmptySection";
import ListingSection from "components/listings/ListingSection";
import { getCurrentUser } from "utils/auth";
import { getListingById } from "utils/listings";

interface Props {
  params: {
    listingId?: string;
  };
}

const Listing = async ({ params }: Props) => {
  const listing = await getListingById(params);
  const user = await getCurrentUser();

  if (!listing) return <EmptySection />;

  return <ListingSection listing={listing} user={user} />;
};

export default Listing;
