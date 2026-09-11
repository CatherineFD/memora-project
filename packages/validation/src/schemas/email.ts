import * as yup from "yup";

export const emailSchema = yup
  .string()
  .email("Некорректный email")
  .required("Email обязателен");
