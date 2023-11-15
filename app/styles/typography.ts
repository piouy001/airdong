import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const FontWeight = {
  Regular: 400,
  SemiBold: 600,
  Bold: 700,
} as const;

const typography = {
  fontFamily: outfit.style.fontFamily,
  h1: {
    fontWeight: FontWeight.SemiBold,
    fontSize: "32px",
    lineHeight: "44px",
  },
  h2: {
    fontWeight: FontWeight.SemiBold,
    fontSize: "28px",
    lineHeight: "40px",
  },
  h3: {
    fontWeight: FontWeight.SemiBold,
    fontSize: "24px",
    lineHeight: "32px",
  },
  h4: {
    fontWeight: FontWeight.SemiBold,
    fontSize: "20px",
    lineHeight: "28px",
  },
  h5: {
    fontWeight: FontWeight.SemiBold,
    fontSize: "18px",
    lineHeight: "26px",
  },
  h6: {
    fontWeight: FontWeight.SemiBold,
    fontSize: "16px",
    lineHeight: "24px",
  },

  body1: {
    fontWeight: FontWeight.Regular,
    fontSize: "16px",
    lineHeight: "24px",
  },
  body2: {
    fontWeight: FontWeight.Regular,
    fontSize: "14px",
    lineHeight: "20px",
  },
  subtitle1: {
    fontWeight: FontWeight.Regular,
    fontSize: "12px",
    lineHeight: "18px",
  },
  subtitle2: {
    fontWeight: FontWeight.Regular,
    fontSize: "11px",
    lineHeight: "16px",
  },
};

export default typography;
