import { Grid } from "@mui/material";
import React from "react";

import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";

const Header = (): React.ReactNode => (
  <Grid
    container
    justifyContent="space-between"
    alignItems="center"
    sx={{
      maxWidth: "100%",
      height: "80px",
      paddingInline: "40px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "divider",
    }}
  >
    <Logo />
    <Search />
    <Menu />
  </Grid>
);

export default Header;
