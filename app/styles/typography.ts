import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const typography = {
  fontFamily: roboto.style.fontFamily,
  h1: {
    fontWeight: 600,
    fontSize: "32px",
    lineHeight: "44px",
  },
  h2: {
    fontWeight: 600,
    fontSize: "28px",
    lineHeight: "40px",
  },
  h3: {
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "32px",
  },
  h4: {
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "28px",
  },
  h5: {
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "26px",
  },
  h6: {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
  },

  body1: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
  },
  body2: {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
  },
  subtitle2: {
    fontWeight: 400,
    fontSize: "11px",
    lineHeight: "16px",
  },
};

export default typography;
