"use client";

import styled from "@emotion/styled";
import React from "react";

import { Devices } from "styles/breakpoints";
import { SafeListing } from "types/listing";
import { SafeUser } from "types/user";

import ListingCard from "./ListingCard";

interface Props {
  user: SafeUser | null;
  listings: SafeListing[];
}

const ListingsSection = ({ user, listings }: Props): React.ReactNode => (
  <Container>
    <List>{listings?.map(item => <ListingCard key={item.id} data={item} user={user} />)}</List>
  </Container>
);

const Container = styled.div`
  padding-inline: 24px;
  padding-block-start: 16px;
  
  @media ${Devices.Desktop} {
    padding-inline: 40px;
    padding-block-start: 24px;
  }
`;
const List = styled.div`
  display: grid;
  gap: 20px;
  @media ${Devices.Mobile} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media ${Devices.Tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media ${Devices.Desktop} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media ${Devices.LargeDesktop} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media ${Devices.XLargeDesktop} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export default ListingsSection;
