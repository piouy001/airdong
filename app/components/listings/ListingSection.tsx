"use client";

import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Avatar, Typography } from "@mui/material";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Range } from "react-date-range";
import { useTranslation } from "react-i18next";
import { IoPersonSharp } from "react-icons/io5";

import { categories } from "components/layout/Header/Categories";
import LoginModal from "components/modal/LoginModal";
import Map from "components/rent/Map";
import { TRIPS_URL } from "constants/URLConstant";
import { useModal } from "contexts/ModalContext";
import { useSnackbar } from "contexts/SnackbarContext";
import useCountries from "hooks/useCountries";
import useReservationMutation from "queries/listings/useReservationMutation";
import { Devices } from "styles/breakpoints";
import { FontWeight } from "styles/typography";
import { SafeListing } from "types/listing";
import { SafeReservation } from "types/reservation";
import { SafeUser } from "types/user";

import Calendar from "./Calendar";
import ListingHeading from "./ListingHeading";

const initialDateRange = {
  key: "selection",
  startDate: new Date(),
  endDate: new Date(),
};

interface Props {
  listing: SafeListing & {
    user: SafeUser;
  };
  user: SafeUser | null;
  reservations?: SafeReservation[];
}

const ListingSection = ({ listing, user, reservations = [] }: Props): React.ReactNode => {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { openSnackbar } = useSnackbar();
  const router = useRouter();
  const { getByValue } = useCountries();
  const mutation = useReservationMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const category = useMemo(() => categories.find(item => item.key === listing.category), [listing.category]);
  const coordinates = getByValue(listing.locationValue)?.latlng;

  const handleReservation = useCallback(() => {
    if (!user)
      return openModal({
        content: <LoginModal />,
      });
    if (!dateRange.startDate || !dateRange.endDate) return;
    setIsLoading(true);
    mutation
      .trigger({ totalPrice, startDate: dateRange.startDate, endDate: dateRange.endDate, listingId: listing.id })
      .then(() => {
        openSnackbar({
          snackbarType: "success",
          text: t("listings.reservation.success"),
        });
        setDateRange(initialDateRange);
        router.push(TRIPS_URL);
      })
      .catch(error => {
        openSnackbar({
          snackbarType: "error",
          text: t("listings.reservation.error"),
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router, openModal, openSnackbar, user, dateRange, listing, mutation, totalPrice, t]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <ListingHeading
        title={listing.title}
        locationValue={listing.locationValue}
        imageSrc={listing.imageSrc}
        id={listing.id}
        user={user}
      />
      <Content>
        <CalendarContainer>
          <CalendarContent>
            <Price>
              <Typography variant="h3">$ {listing.price}</Typography>
              <Typography variant="body1" color="text.secondary">
                / {t("listings.card.night")}
              </Typography>
            </Price>
            <Divider style={{ marginBlock: "16px" }} />
            <Calendar
              value={dateRange}
              disabledDates={disabledDates}
              onChange={date => {
                setDateRange(date.selection);
              }}
            />
            <Divider style={{ marginBlock: "16px" }} />
            <TotalPrice>
              <Typography variant="h5">{t("listings.reservation.total")}</Typography>
              <Typography variant="h5">$ {totalPrice}</Typography>
            </TotalPrice>
            <ButtonContainer>
              <LoadingButton loading={isLoading} variant="contained" size="large" fullWidth onClick={handleReservation}>
                {t("listings.reservation.label")}
              </LoadingButton>
            </ButtonContainer>
          </CalendarContent>
        </CalendarContainer>
        <OptionList>
          <Option>
            <Host>
              <Typography variant="h5">{t("listings.listing.hosted", { host: listing.user?.name })}</Typography>
              <Avatar sx={{ width: 28, height: 28, bgcolor: "text.secondary" }} src={listing.user?.image ?? ""}>
                <IoPersonSharp size={16} />
              </Avatar>
            </Host>
            <CountList>
              <CountItem variant="body1">{`${listing.guestCount} ${t("rent.info.guest.title")}`} </CountItem>
              <CountItem variant="body1">{`${listing.roomCount} ${t("rent.info.room.title")}`} </CountItem>
              <CountItem variant="body1">{`${listing.bathroomCount} ${t("rent.info.bathroom.title")}`} </CountItem>
            </CountList>
          </Option>
          <Divider />
          {category && (
            <Option>
              <Category>
                <CategoryIcon>
                  <category.icon size={32} />
                </CategoryIcon>
                <CategoryContent>
                  <Typography variant="h5">{t(category.label)}</Typography>
                  <CountItem variant="body1">{t(category.description)}</CountItem>
                </CategoryContent>
              </Category>
            </Option>
          )}
          <Divider />
          <Option>
            <Typography variant="h5" color="text.secondary" fontWeight={FontWeight.Regular}>
              {listing.description}
            </Typography>
          </Option>
          <Divider />
          <Option>
            <Map center={coordinates} />
          </Option>
        </OptionList>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding-inline: 24px;
  padding-block: 16px 48px;
  @media ${Devices.Desktop} {
    padding-inline: 40px;
    padding-block: 24px 48px;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-block-start: 20px;
  gap: 32px;
  @media ${Devices.Desktop} {
    flex-direction: row-reverse;
  }
`;
const CalendarContainer = styled.div`
  overflow: hidden;
  flex: 1;
`;
const CalendarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-inline: 16px;
  padding-block-start: 16px;
`;
const TotalPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-inline: 16px;
  padding-block-end: 16px;
`;
const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Option = styled.div``;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-block: 32px;
  background: ${({ theme }) => theme.palette.divider};
`;
const Host = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;
const CountList = styled.div`
  display: flex;
  margin-block-start: 16px;
  gap: 8px;
`;
const CountItem = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;
const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
const CategoryIcon = styled.div``;
const CategoryContent = styled.div``;
const ButtonContainer = styled.div`
  padding-inline: 16px;
  padding-block-end: 24px;
`;

export default ListingSection;
