import styled from 'styled-components';
import AppBar from 'components/AppBar';

interface Props {
  component: JSX.Element;
  title?: string;
}

function FullHeightLayout(props: Props) {
  const title = props.title || 'Zero To English';

  return (
    <Container>
      <AppBar title={title} />

      <Content>{props.component}</Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex-grow: 2;
`;

export default FullHeightLayout;
