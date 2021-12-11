import React from 'react';
import {TextField, InputAdornment} from '@mui/material';
import styled from 'styled-components';
import {kMaxLength} from 'buffer';

interface Props {
  value: string;
  type?: 'text' | 'password';
  maxLength?: number;
  textarea?: boolean;
  placeholder?: string;
  className?: string;
  startIcon?: JSX.Element;
  onChange: (value: string) => void;
}

function AppInput(props: Props) {
  const {
    value,
    placeholder,
    className,
    startIcon,
    maxLength,
    textarea = false,
    type = 'text',
  } = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return props.onChange(event.target.value);
  };

  const additionalAttributes: {[key: string]: any} = {
    InputProps: {},
    inputProps: {},
  };

  if (startIcon) {
    additionalAttributes.InputProps.startAdornment = (
      <InputAdornment position="start">{startIcon}</InputAdornment>
    );
  }

  if (maxLength) {
    additionalAttributes.inputProps.maxLength = maxLength;
  }

  return (
    <StyledTextField
      className={className}
      label={placeholder}
      onChange={onChange}
      value={value}
      type={type}
      multiline={textarea}
      fullWidth
      {...additionalAttributes}
    />
  );
}

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
`;

export default AppInput;
