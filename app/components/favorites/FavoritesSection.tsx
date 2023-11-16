"use client";

import styled from "@emotion/styled";
import React from "react";
import { useTranslation } from "react-i18next";

import Heading from "components/Heading";
import ListingCard from "components/listings/ListingCard";
import { List } from "components/listings/ListingsSection";
import { Devices } from "styles/breakpoints";
import { SafeListing } from "types/listing";
import { SafeUser } from "types/user";

interface Props {
  listings: SafeListing[];
  user: SafeUser | null;
}

const FavoritesSection = ({ listings, user }: Props): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Container>
      <Heading title={t("header.menu.favorites")} description={t("favorite.main.description")} />
      <List>
        {listings.map(item => (
          <ListingCard key={item.id} data={item} user={user} />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  padding-inline: 24px;
  padding-block-start: 16px;

  @media ${Devices.Desktop} {
    padding-inline: 40px;
    padding-block-start: 24px;
  }
`;

export default FavoritesSection;
