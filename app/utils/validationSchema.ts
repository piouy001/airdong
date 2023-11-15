import * as yup from "yup";

export const emailSchema = yup.string().email("string.email").required("any.empty");
export const nameSchema = yup.string().min(1, "string.min").max(12, "string.max").required("any.empty");
export const passwordSchema = yup
  .string()
  .min(10, "string.min")
  .matches(/[0-9]+/, "numbers")
  .required("any.empty");

export const rentSchema = yup.object({
  category: yup.string().required(),
  location: yup.string().required(),
  guestCount: yup.number().required(),
  roomCount: yup.number().required(),
  bathroomCount: yup.number().required(),
  imageSrc: yup.string().required(),
  price: yup.number().required(),
  title: yup.string().required(),
  description: yup.string().required(),
});
