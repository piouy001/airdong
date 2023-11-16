import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import BaseImage from "next/image";
import React from "react";

import FavoriteButton from "components/FavoriteButton";
import Heading from "components/Heading";
import useCountries from "hooks/useCountries";
import { SafeUser } from "types/user";

interface Props {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  user: SafeUser | null;
}

const ListingHeading = ({ title, locationValue, imageSrc, id, user }: Props): React.ReactNode => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <Container>
      <Heading title={title} description={`${location?.region} ${location?.label}`} />
      <ImageContainer>
        <Image fill src={imageSrc} alt="listing-image" />
        <ButtonConntainer>
          <FavoriteButton listingId={id} user={user} />
        </ButtonConntainer>
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 60vh;
  margin-block: 24px;
  border-radius: 12px;
`;
const Image = styled(BaseImage)`
  position: absolute;
  height: 100%;
  width: 100%;
  inset: 0px;
  object-fit: cover;
`;
const ButtonConntainer = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
`;
export default ListingHeading;
