import styled from 'styled-components';
import {Slider} from '@mui/material';

interface Props {
  value: number;
  step?: number;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  className?: string;
  onChange: (value: number) => void;
  valueLabelFormat?: (value: number) => string;
}

function AppSlider(props: Props) {
  const {
    value,
    step,
    startIcon,
    endIcon,
    className,
    valueLabelFormat = (value: number) => value.toString(),
  } = props;

  const onChange = (event: Event, newValue: number | number[]) => {
    return props.onChange(newValue as number);
  };

  return (
    <Container className={className}>
      {startIcon && <StartIconContainer>{startIcon}</StartIconContainer>}

      <Slider
        value={value}
        step={step}
        onChange={onChange}
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
      />

      {endIcon && <EndIconContainer>{endIcon}</EndIconContainer>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const StartIconContainer = styled.div`
  display: flex;
  margin-right: 10px;
`;

const EndIconContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

export default AppSlider;
