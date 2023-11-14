import { getServerSession } from "next-auth/next";

import prisma from "libs/prismadb";
import { authOptions } from "pages/api/auth/[...nextauth]";


export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
    };
  } catch (error) {
    return null;
  }
};
