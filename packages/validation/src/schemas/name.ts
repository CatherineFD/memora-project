import * as yup from "yup";

export const nameSchema = (fieldName: string) =>
  yup.string()
    .trim()
    .required(`Введите ${fieldName.toLowerCase()}`)
    .min(2, `${fieldName} должно содержать минимум 2 символа`)
    .max(50, `${fieldName} не должно превышать 50 символов`)
    .matches(
      /^[A-Za-zА-Яа-яЁё'\-\s]+$/,
      `${fieldName} может содержать только буквы`
    );