import styled from 'styled-components';
import {Checkbox} from '@mui/material';

interface Props {
  value: boolean;
  className?: string;
  onChange: (value: boolean) => void;
}

function AppCheckbox(props: Props) {
  const {value, className} = props;

  const onChange = (event: React.SyntheticEvent, checked: boolean) => {
    return props.onChange(checked);
  };

  return (
    <Container className={className}>
      <Checkbox checked={value} onChange={onChange} />
    </Container>
  );
}

const Container = styled.div``;

export default AppCheckbox;
