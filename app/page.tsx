import React from "react";

import EmptySection from "components/EmptySection";
import UIBoundary from "components/UIBoundary";
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
  if (isEmpty)
    return (
      <UIBoundary>
        <EmptySection showReset />
      </UIBoundary>
    );

  return (
    <UIBoundary>
      <ListingsSection user={user} listings={listings} />
    </UIBoundary>
  );
};

export default HomeScreen;
