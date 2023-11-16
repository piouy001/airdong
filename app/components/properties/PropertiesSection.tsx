"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import Heading from "components/Heading";
import ListingCard from "components/listings/ListingCard";
import { List } from "components/listings/ListingsSection";
import { useSnackbar } from "contexts/SnackbarContext";
import useDeleteListingMutation from "queries/listings/useDeleteListingMutation";
import { Devices } from "styles/breakpoints";
import { SafeListing } from "types/listing";
import { SafeUser } from "types/user";

interface Props {
  listings: SafeListing[];
  user: SafeUser | null;
}

const PropertiesSection = ({ listings, user }: Props): React.ReactNode => {
  const { t } = useTranslation();
  const router = useRouter();
  const mutation = useDeleteListingMutation();
  const { openSnackbar } = useSnackbar();
  const [deletingId, setDeletingId] = useState("");

  const handleCancel = useCallback(
    (listingId: string) => {
      setDeletingId(listingId);

      mutation
        .trigger({ listingId })
        .then(() => {
          openSnackbar({
            snackbarType: "success",
            text: t("properties.delete.success"),
          });
          router.refresh();
        })
        .catch(() => {
          openSnackbar({
            snackbarType: "error",
            text: t("properties.delete.error"),
          });
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [t, router, mutation, openSnackbar],
  );

  return (
    <Container>
      <Heading title={t("header.menu.properties")} description={t("properties.main.description")} />
      <List>
        {listings.map(item => (
          <ListingCard
            key={item.id}
            data={item}
            actionId={item.id}
            actionLabel={t("properties.delete.label")}
            onAction={handleCancel}
            disabled={deletingId === item.id}
            user={user}
          />
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

export default PropertiesSection;
