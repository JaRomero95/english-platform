import React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

class AppInput extends React.Component<Props> {
  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return this.props.onChange(event.target.value);
  };

  render() {
    const {value, placeholder} = this.props;

    return (
      <StyledTextField
        label={placeholder}
        onChange={this.onChange}
        value={value}
        fullWidth
      />
    );
  }
}

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
`;

export default AppInput;
