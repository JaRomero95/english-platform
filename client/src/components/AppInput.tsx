import React from 'react';
import {TextField, InputAdornment} from '@mui/material';
import styled from 'styled-components';

interface Props {
  value: string;
  type?: 'text' | 'password';
  placeholder?: string;
  className?: string;
  startIcon?: JSX.Element;
  onChange: (value: string) => void;
}

function AppInput(props: Props) {
  const {value, placeholder, className, startIcon, type = 'text'} = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return props.onChange(event.target.value);
  };

  const additionalAttributes: {[key: string]: any} = {};

  if (startIcon) {
    additionalAttributes.InputProps = {
      startAdornment: (
        <InputAdornment position="start">{startIcon}</InputAdornment>
      ),
    };
  }

  return (
    <StyledTextField
      className={className}
      label={placeholder}
      onChange={onChange}
      value={value}
      type={type}
      fullWidth
      {...additionalAttributes}
    />
  );
}

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
`;

export default AppInput;
