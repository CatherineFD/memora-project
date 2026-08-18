import { Input as AntdInput } from 'antd';
import type { TextAreaProps } from './TextArea.types';

export const TextArea = ({
  size = 'medium',
  status = 'default',
  ...rest
}: TextAreaProps) => {
  const antdSize = mapSizeToAntdSize(size);
  const antdStatus = status === 'default' ? undefined : status;

  return (
    <AntdInput.TextArea
      size={antdSize}
      status={antdStatus}
      {...rest}
    />
  );
};

const mapSizeToAntdSize = (size: TextAreaProps['size']) => {
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