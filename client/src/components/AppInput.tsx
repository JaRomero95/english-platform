import React from 'react';
import TextField from '@mui/material/TextField';

interface Props {
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class AppInput extends React.Component<Props> {
  render() {
    const {value, placeholder, onChange} = this.props;

    return <TextField label={placeholder} onChange={onChange} value={value} />;
  }
}

export default AppInput;
