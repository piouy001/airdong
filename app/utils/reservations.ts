import prisma from "libs/prismadb";

interface ReservationsProps {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

const getReservations = async (params: ReservationsProps) => {
  try {
    const { listingId, userId, authorId } = params;

    const query: {
      listingId?: string;
      userId?: string;
      listing?: {
        userId?: string;
      };
    } = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map(reservation => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getReservations };
