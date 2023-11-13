import type { Metadata } from "next";
import React from "react";

import I18nProvider from "I18nextProvider";
import Header from "components/layout/Header/Header";
import Modal from "components/modal";
import ThemeRegistry from "components/theme/ThemeRegistry";
import RootContextProvider from "contexts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Airdong",
  description: "Vacation Homes &amp; Condo Rentals",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <I18nProvider>
        <ThemeRegistry>
          <RootContextProvider>
            <Header />
            {children}
            <Modal />
          </RootContextProvider>
        </ThemeRegistry>
      </I18nProvider>
    </body>
  </html>
);

export default RootLayout;
