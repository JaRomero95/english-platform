import AppBar from 'components/AppBar';
import styled from 'styled-components';
import stylesConfig from 'config/styles';

interface Props {
  component: JSX.Element;
  title?: string;
}

function DefaultLayout(props: Props) {
  const title = props.title || 'Zero To English';

  return (
    <div>
      <AppBar title={title} />

      <Container>{props.component}</Container>
    </div>
  );
}

const Container = styled.div`
  padding-top: ${stylesConfig.LAYOUT_SM_VERTICAL_PADDING};
  padding-bottom: ${stylesConfig.LAYOUT_SM_VERTICAL_PADDING};
  padding-left: ${stylesConfig.LAYOUT_SM_SIDE_PADDING};
  padding-right: ${stylesConfig.LAYOUT_SM_SIDE_PADDING};
  margin: 0 auto;
  max-width: 1000px;
`;

export default DefaultLayout;
