import React from "react";

import EmptySection from "components/EmptySection";
import ListingsSection from "components/listings/ListingsSection";
import { getCurrentUser } from "utils/auth";
import { getListings, IListingsParams } from "utils/listings";

interface Props {
  searchParams: IListingsParams;
}

const HomeScreen = async ({ searchParams }: Props) => {
  const listings = await getListings(searchParams);
  const user = await getCurrentUser();
  const isEmpty = listings.length === 0;
  if (isEmpty) return <EmptySection showReset />;

  return <ListingsSection user={user} listings={listings} />;
};

export default HomeScreen;
