import * as yup from "yup";

export const passwordSchema = yup
  .string()
  .min(6, "Минимум 6 символов")
  .required("Пароль обязателен");