import React from 'react';
import styled from 'styled-components';

class AppPageTitle extends React.Component {
  render() {
    return <Title>{this.props.children}</Title>;
  }
}

const Title = styled.h2`
  font-size: 1.5em;
  margin: 0 0 2rem 0;
  text-transform: uppercase;
  text-align: center;
`;

export default AppPageTitle;
