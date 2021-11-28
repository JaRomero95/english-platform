import React from 'react';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StyleIcon from '@mui/icons-material/Style';
import LinkOptions from 'models/LinkOptions';
import mainRoutes from 'config/mainRoutes';

const upperLinks: LinkOptions[] = mainRoutes;

const bottomLinks: LinkOptions[] = [
  {
    path: '/administration/flash-cards',
    title: 'Manage Flash Cards',
    icon: <StyleIcon />,
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

class AppNavigationDrawer extends React.Component<Props> {
  renderLinks(links: LinkOptions[]) {
    return (
      <List>
        {links.map((link) => (
          <ListItem component={Link} to={link.path} button key={link.path}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.title} />
          </ListItem>
        ))}
      </List>
    );
  }
  render() {
    const {open, onClose} = this.props;

    return (
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box sx={{width: 300}} onClick={onClose}>
          {this.renderLinks(upperLinks)}

          <Divider />

          {this.renderLinks(bottomLinks)}
        </Box>
      </Drawer>
    );
  }
}

export default AppNavigationDrawer;
