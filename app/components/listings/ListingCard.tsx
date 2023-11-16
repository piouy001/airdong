import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { Reservation } from "@prisma/client";
import { format } from "date-fns";
import BaseImage from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import FavoriteButton from "components/FavoriteButton";
import useCountries from "hooks/useCountries";
import { FontWeight } from "styles/typography";
import { SafeListing } from "types/listing";
import { SafeUser } from "types/user";

interface Props {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  user: SafeUser | null;
}

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  user,
}: Props): React.ReactNode => {
  const router = useRouter();
  const { t } = useTranslation();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  const handleClick = () => {
    router.push(`listings/${data.id}`);
  };

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled],
  );

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  }, [reservation]);

  return (
    <Card onClick={handleClick}>
      <Content>
        <ImageContainer>
          <Image fill src={data.imageSrc} alt="list-image" />
          <ButtonConntainer>
            <FavoriteButton listingId={data.id} user={user} />
          </ButtonConntainer>
        </ImageContainer>
        <Label variant="h6">
          {location?.region}, {location?.label}
        </Label>
        <Label variant="body2" fontWeight={FontWeight.SemiBold} color="text.secondary">
          {reservationDate ?? data.category}
        </Label>
        <Price>
          <Label variant="body2" fontWeight={FontWeight.SemiBold} color="text.primary">
            $ {price}
          </Label>
          {!reservation && (
            <Label variant="body2" fontWeight={FontWeight.SemiBold} color="text.secondary">
              / {t("listings.card.night")}
            </Label>
          )}
        </Price>
        {onAction && actionLabel && (
          <Button
            variant="contained"
            disabled={disabled}
            size="small"
            onClick={handleCancel}
            sx={{ marginBlockStart: "8px" }}
          >
            {actionLabel}
          </Button>
        )}
      </Content>
    </Card>
  );
};

const Card = styled.div`
  grid-column: span 1 / span 1;
  cursor: pointer;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;
const ImageContainer = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
`;
const Image = styled(BaseImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ButtonConntainer = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
`;
const Label = styled(Typography)``;
const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export default ListingCard;
