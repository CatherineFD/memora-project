import React from 'react';
import { Form as SUIForm } from 'semantic-ui-react';
import type { FormProps } from 'semantic-ui-react';

// 1. Обертка для Form.Input
// Мы используем React.ComponentProps, чтобы автоматически подтянуть все типы из semantic-ui-react
type FormInputProps = React.ComponentProps<typeof SUIForm.Input>;

const FormInput: React.FC<FormInputProps> = (props) => {
  return (
    // Задаем дефолтные пропсы. Если потребитель передаст свой fluid={false}, он перезапишет наш.
    <SUIForm.Input 
      fluid 
      {...props} 
    />
  );
};

// 2. Обертка для Form.Button
type FormButtonProps = React.ComponentProps<typeof SUIForm.Button>;

const FormButton: React.FC<FormButtonProps> = (props) => {
  return (
    <SUIForm.Button 
      primary 
      fluid 
      {...props} 
    />
  );
};

// 3. Обертка для Form.Field (часто нужен для кастомных лейаутов)
type FormFieldProps = React.ComponentProps<typeof SUIForm.Field>;

const FormField: React.FC<FormFieldProps> = (props) => {
  return <SUIForm.Field {...props} />;
};

// 4. Главный компонент Form
// Мы создаем базовый компонент и "приклеиваем" к нему вложенные, 
// чтобы сохранить привычный API: <Form.Input />, <Form.Button />
type MyFormProps = FormProps;

const FormBase: React.FC<MyFormProps> = (props) => {
  // Можно добавить глобальный обработчик или классы
  return <SUIForm {...props} />;
};

// Прикрепляем подкомпоненты к главному объекту Form
const Form = Object.assign(FormBase, {
  Input: FormInput,
  Button: FormButton,
  Field: FormField,
  // Сюда можно добавить Group, Dropdown, Checkbox и т.д. по мере необходимости
});

export { Form };
export type { MyFormProps, FormInputProps, FormButtonProps };