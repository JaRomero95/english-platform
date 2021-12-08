import React from 'react';
import styled from 'styled-components';
import AppLinkCard from 'components/AppLinkCard';
import mainRoutes from 'config/mainRoutes';

class HomePage extends React.Component {
  render() {
    return (
      <Container>
        {mainRoutes.map((link) => (
          <LinkItem key={link.path} {...link} />
        ))}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem 0;
`;

const LinkItem = styled(AppLinkCard)`
  width: 100%;

  @media (min-width: 650px) {
    width: 48%;
  }

  @media (min-width: 900px) {
    width: 31%;
  }
`;

export default HomePage;
