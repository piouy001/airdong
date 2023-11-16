import React from "react";

import EmptySection from "components/EmptySection";
import UIBoundary from "components/UIBoundary";
import FavoritesSection from "components/favorites/FavoritesSection";
import { getCurrentUser } from "utils/auth";
import getFavoriteListings from "utils/favorites";

const FavoritesScreen = async () => {
  const user = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (listings.length === 0)
    return (
      <UIBoundary>
        <EmptySection titleKey="favorite.empty.title" descriptionKey="favorite.empty.description" />
      </UIBoundary>
    );

  return (
    <UIBoundary>
      <FavoritesSection listings={listings} user={user} />
    </UIBoundary>
  );
};

export default FavoritesScreen;
