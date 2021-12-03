import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';

interface Props {
  onClick: (event: React.SyntheticEvent) => void;
  disabled?: boolean;
  endIcon?: JSX.Element;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
}

class AppButton extends React.Component<Props> {
  render() {
    const {
      onClick,
      children,
      disabled,
      endIcon,
      size = 'medium',
      type = 'button',
    } = this.props;

    return (
      <StyledButton
        variant="contained"
        disabled={disabled}
        endIcon={endIcon}
        size={size}
        type={type}
        onClick={onClick}
      >
        {children}
      </StyledButton>
    );
  }
}

const StyledButton = styled(Button)`
  width: 100%;
`;

export default AppButton;
