import theme from "styles/theme";

type ExtendedTheme = typeof theme;

declare module "@emotion/react" {
  interface Theme extends ExtendedTheme {}
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    desktop: true;
  }
}

declare module "*.svg" {
  import React from "react";

  const svg: React.FC<React.SVGProps<SVGSVGElement>>;
  export default svg;
}
