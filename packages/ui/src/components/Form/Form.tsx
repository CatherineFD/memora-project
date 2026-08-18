import { Form as AntdForm } from 'antd';
import type { FormProps } from './Form.types';
import { FormItem } from './Form.Item';
import { FormDropdown } from './Form.Dropdown';
import { FormInput } from './Form.Input';
import { FormSelect } from './Form.Select';
import { FormButton } from './Form.Button';

export const Form = ({
  children,
  onSubmit,
  onValuesChange,
  initialValues,
  layout = 'vertical',
  size = 'medium',
  ...rest
}: FormProps) => {
  const antdSize = mapSizeToAntdSize(size);

  const handleFinish = (values: Record<string, any>) => {
    onSubmit?.(values);
  };

  return (
    <AntdForm
      layout={layout}
      size={antdSize}
      initialValues={initialValues}
      onFinish={handleFinish}
      onValuesChange={onValuesChange}
      {...rest}
    >
      {children}
    </AntdForm>
  );
};

// Compound components
Form.Item = FormItem;
Form.Dropdown = FormDropdown;
Form.Input = FormInput;
Form.Select = FormSelect;
Form.Button = FormButton;

const mapSizeToAntdSize = (size: FormProps['size']) => {
  switch (size) {
    case 'small':
      return 'small';
    case 'large':
      return 'large';
    case 'medium':
    default:
      return 'middle';
  }
};