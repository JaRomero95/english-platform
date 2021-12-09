import Button from '@mui/material/Button';
import styled from 'styled-components';

interface Props {
  onClick: (event: React.SyntheticEvent) => void;
  disabled?: boolean;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  variant?: 'contained' | 'text';
  className?: string;
  children: any;
}

function AppButton(props: Props) {
  const {
    onClick,
    children,
    disabled,
    startIcon,
    endIcon,
    className,
    variant = 'contained',
    size = 'medium',
    type = 'button',
  } = props;

  return (
    <StyledButton
      variant={variant}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      size={size}
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  width: 100%;
`;

export default AppButton;
