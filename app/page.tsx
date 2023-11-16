import React from "react";

import EmptySection from "components/EmptySection";
import ListingsSection from "components/listings/ListingsSection";
import { getCurrentUser } from "utils/auth";
import { getListings } from "utils/listings";

const Home = async () => {
  const listings = await getListings();
  const user = await getCurrentUser();
  const isEmpty = listings.length === 0;
  if (isEmpty) return <EmptySection showReset />;

  return <ListingsSection user={user} listings={listings} />;
};

export default Home;
