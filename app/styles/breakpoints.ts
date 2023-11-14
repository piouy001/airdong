export const Sizes = {
  Mobile: 768,
  Desktop: 992,
} as const;

export const isMobile = () => window.matchMedia(`screen and (max-width: ${Sizes.Mobile}px)`).matches;
export const isTablet = () =>
  window.matchMedia(`screen and (min-width: ${Sizes.Mobile}px) and (max-width: ${Sizes.Desktop}px)`).matches;
export const isDesktop = () => window.matchMedia(`screen and (min-width: ${Sizes.Desktop}px)`).matches;

export const Devices = {
  Mobile: `(max-width: ${Sizes.Mobile}px)`,
  Tablet: `(min-width: ${Sizes.Mobile}px) and (max-width: ${Sizes.Desktop}px)`,
  Desktop: `(min-width: ${Sizes.Desktop}px)`,
} as const;

export const breakpoints = {
  values: {
    mobile: 0,
    tablet: Sizes.Mobile,
    desktop: Sizes.Desktop,
  },
};
