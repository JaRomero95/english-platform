import React from 'react';
import AppLinkCard from 'components/AppLinkCard';
import mainRoutes from 'config/mainRoutes';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        {mainRoutes.map((link) => (
          <AppLinkCard {...link} />
        ))}
      </div>
    );
  }
}

export default HomePage;
