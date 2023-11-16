import EmptySection from "components/EmptySection";
import PropertiesSection from "components/properties/PropertiesSection";
import { getCurrentUser } from "utils/auth";
import { getListings } from "utils/listings";

const PropertiesPage = async () => {
  const user = await getCurrentUser();

  if (!user)
    return <EmptySection titleKey="reservations.userempty.title" descriptionKey="reservations.userempty.description" />;

  const listings = await getListings({ userId: user.id });

  if (listings.length === 0)
    return (
      <EmptySection titleKey="properties.listingsempty.title" descriptionKey="properties.listingsempty.description" />
    );

  return <PropertiesSection listings={listings} user={user} />;
};

export default PropertiesPage;
