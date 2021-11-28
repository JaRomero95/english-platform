import React from 'react';
import styled from 'styled-components';
import stylesConfig from 'config/styles';

class AppContentLayout extends React.Component {
  render() {
    return <Container>{this.props.children}</Container>;
  }
}

const Container = styled.div`
  padding-top: ${stylesConfig.LAYOUT_SM_VERTICAL_PADDING};
  padding-bottom: ${stylesConfig.LAYOUT_SM_VERTICAL_PADDING};
  padding-left: ${stylesConfig.LAYOUT_SM_SIDE_PADDING};
  padding-right: ${stylesConfig.LAYOUT_SM_SIDE_PADDING};
  margin: 0 auto;
  max-width: 900px;
`;

export default AppContentLayout;
