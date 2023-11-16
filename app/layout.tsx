import type { Metadata } from "next";
import React from "react";

import I18nProvider from "I18nextProvider";
import Snackbar from "components/Snackbar";
import Categories from "components/layout/Header/Categories";
import Header from "components/layout/Header/Header";
import Modal from "components/modal";
import ThemeRegistry from "components/theme/ThemeRegistry";
import RootContextProvider from "contexts";
import { getCurrentUser } from "utils/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Airdong",
  description: "Vacation Homes &amp; Condo Rentals",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <ThemeRegistry>
            <RootContextProvider>
              <Header user={user} />
              <Categories />
              <main>{children}</main>
              <Modal />
              <Snackbar />
            </RootContextProvider>
          </ThemeRegistry>
        </I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
