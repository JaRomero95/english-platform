import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AppLinkCard from 'components/AppLinkCard';

const links = [
  {
    path: '/irregular-verbs',
    title: 'Irregular Verbs',
    icon: <MenuIcon />,
  },
  {
    path: '/flash-cards',
    title: 'Flash Cards',
    icon: <HomeIcon />,
  },
];

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Home page</h1>

        {links.map((link) => (
          <AppLinkCard {...link} />
        ))}
      </div>
    );
  }
}

export default HomePage;
