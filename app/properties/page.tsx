import EmptySection from "components/EmptySection";
import UIBoundary from "components/UIBoundary";
import PropertiesSection from "components/properties/PropertiesSection";
import { getCurrentUser } from "utils/auth";
import { getListings } from "utils/listings";

const PropertiesPage = async () => {
  const user = await getCurrentUser();

  if (!user)
    return (
      <UIBoundary>
        <EmptySection titleKey="reservations.userempty.title" descriptionKey="reservations.userempty.description" />
      </UIBoundary>
    );

  const listings = await getListings({ userId: user.id });

  if (listings.length === 0)
    return (
      <UIBoundary>
        <EmptySection titleKey="properties.listingsempty.title" descriptionKey="properties.listingsempty.description" />
      </UIBoundary>
    );

  return (
    <UIBoundary>
      <PropertiesSection listings={listings} user={user} />
    </UIBoundary>
  );
};

export default PropertiesPage;
