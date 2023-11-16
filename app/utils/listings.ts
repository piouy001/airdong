import prisma from "libs/prismadb";

const getListings = async () => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getListings };
