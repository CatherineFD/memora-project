import { Typography as AntdTypography } from 'antd';
import type { TypographyProps } from './Typography.types';

const { Title, Text, Paragraph, Link } = AntdTypography;

export const Typography = ({
  children,
  variant = 'text',
  level = 1,
  type,
  strong = false,
  italic = false,
  underline = false,
  strikethrough = false,
  code = false,
  mark = false,
  disabled = false,
  ellipsis = false,
  copyable = false,
  href,
  target,
  onClick,
  className,
  style,
}: TypographyProps) => {
  const baseProps = {
    type,
    strong,
    italic,
    underline,
    delete: strikethrough,
    code,
    mark,
    disabled,
    className,
    style,
    onClick,
  };

  const extendedProps = {
    ellipsis,
    copyable,
  };

  switch (variant) {
    case 'title':
      return (
        <Title level={level} {...baseProps} {...extendedProps}>
          {children}
        </Title>
      );
    case 'paragraph':
      return (
        <Paragraph {...baseProps} {...extendedProps}>
          {children}
        </Paragraph>
      );
    case 'link':
      return (
        <Link href={href} target={target} {...baseProps}>
          {children}
        </Link>
      );
    case 'text':
    default:
      return (
        <Text {...baseProps} {...extendedProps}>
          {children}
        </Text>
      );
  }
};