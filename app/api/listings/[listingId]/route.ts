import { NextResponse } from "next/server";

import prisma from "libs/prismadb";
import { getCurrentUser } from "utils/auth";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: {
      listingId?: string;
    };
  },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}