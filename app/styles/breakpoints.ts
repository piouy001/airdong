export const SIZES = {
  mobile: 768,
  desktop: 992,
};

export const isMobile = () => window.matchMedia(`screen and (max-width: ${SIZES.mobile}px)`).matches;
export const isTablet = () =>
  window.matchMedia(`screen and (min-width: ${SIZES.mobile}px) and (max-width: ${SIZES.desktop}px)`).matches;
export const isDesktop = () => window.matchMedia(`screen and (min-width: ${SIZES.desktop}px)`).matches;

export const DEVICES = {
  mobile: `(max-width: ${SIZES.mobile}px)`,
  tablet: `(min-width: ${SIZES.mobile}px) and (max-width: ${SIZES.desktop}px)`,
  desktop: `(min-width: ${SIZES.desktop}px)`,
};
