import theme from "styles/theme";

type ExtendedTheme = typeof theme;

declare module "@emotion/react" {
  interface Theme extends ExtendedTheme {}
}

declare module "*.svg" {
  import React from "react";

  const svg: React.FC<React.SVGProps<SVGSVGElement>>;
  export default svg;
}
