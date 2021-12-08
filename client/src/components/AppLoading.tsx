import styled from 'styled-components';
import {CircularProgress} from '@mui/material';

interface Props {
  show: boolean;
}

function AppLoading(props: Props) {
  const {show} = props;

  const className = show ? 'visible' : '';

  return (
    <LoadingContainer className={className}>
      <CircularProgress />

      <Text>Loading...</Text>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: #fff;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: hidden;

  &.visible {
    visibility: visible;
  }
`;

const Text = styled.div`
  margin-top: 2rem;
`;

export default AppLoading;
