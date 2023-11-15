import * as yup from "yup";

export const emailSchema = yup.string().email("string.email").required("any.empty");
export const nameSchema = yup.string().min(1, "string.min").max(12, "string.max").required("any.empty");
export const passwordSchema = yup
  .string()
  .min(10, "string.min")
  .matches(/[0-9]+/, "numbers")
  .required("any.empty");

  
const locationSchema = yup.object({
  value:yup.string().required(),
  label:yup.string().required(),
  latlng:yup.array(yup.number()).required(),
  flag:yup.string().required(),
  region:yup.string().required(),
}).nullable();

export const rentSchema = yup.object({
  category: yup.string(),
  location: locationSchema,
  guestCount: yup.number(),
  roomCount: yup.number(),
  bathroomCount: yup.number(),
  imageSrc: yup.string(),
  price: yup.number().required(),
  title: yup.string().required(),
  description: yup.string().required(),
});
