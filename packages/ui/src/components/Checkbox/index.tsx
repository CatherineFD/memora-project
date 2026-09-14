import { Checkbox as SUICheckbox } from 'semantic-ui-react';

type CheckboxProps = React.ComponentProps<typeof SUICheckbox>;

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <SUICheckbox {...props} />;
};
