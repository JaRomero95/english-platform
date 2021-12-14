import styled from 'styled-components';
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface Props {
  value: any;
  options: {label: string; value: any}[];
  label?: string;
  helperText?: string;
  className?: string;
  onChange: (value: any) => void;
}

function AppSelect(props: Props) {
  const {value, options, label, helperText, className} = props;

  const onChange = (event: SelectChangeEvent) => {
    props.onChange(event.target.value);
  };

  const labelId = (Date.now() + Math.random()).toString();

  return (
    <StyledControl>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}

      <Select
        id={labelId}
        labelId={labelId}
        value={value}
        label={label}
        onChange={onChange}
        displayEmpty
      >
        {options.map(({label, value}) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </StyledControl>
  );
}

const StyledControl = styled(FormControl)`
  width: 100%;
`;

export default AppSelect;
