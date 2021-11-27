import React from 'react';
import styled from 'styled-components';

class AppContentLayout extends React.Component {
  render() {
    return <Container>{this.props.children}</Container>;
  }
}

const Container = styled.div`
  padding: 2rem 1rem;
  margin: 0 auto;
  max-width: 900px;
`;

export default AppContentLayout;
