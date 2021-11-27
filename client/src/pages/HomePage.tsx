import React from 'react';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AppLinkCard from 'components/AppLinkCard';

const links = [
  {
    path: '/flash-cards',
    title: 'Flash Cards',
    icon: <AutoAwesomeMotionIcon />,
  },
  {
    path: '/irregular-verbs',
    title: 'Irregular Verbs',
    icon: <FormatListNumberedRtlIcon />,
  },
];

class HomePage extends React.Component {
  render() {
    return (
      <div>
        {links.map((link) => (
          <AppLinkCard {...link} />
        ))}
      </div>
    );
  }
}

export default HomePage;
