import styled from 'styled-components';
import {Checkbox, FormGroup, FormControlLabel} from '@mui/material';

interface Props {
  value: boolean;
  label?: string;
  className?: string;
  onChange: (value: boolean) => void;
}

function AppCheckbox(props: Props) {
  const {value, className, label = ''} = props;

  const onChange = (event: React.SyntheticEvent, checked: boolean) => {
    return props.onChange(checked);
  };

  return (
    <FormGroup className={className}>
      <FormControlLabel
        control={<Checkbox checked={value} onChange={onChange} />}
        label={label}
      />
    </FormGroup>
  );
}

const Container = styled.div``;

export default AppCheckbox;
