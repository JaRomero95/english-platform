import React from 'react';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  Style as StyleIcon,
  Category as CategoryIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import LinkOptions from 'models/LinkOptions';
import mainRoutes from 'config/mainRoutes';
import {observer} from 'mobx-react-lite';
import UserStoreContext from 'providers/UserStoreContext';

const upperLinks: LinkOptions[] = mainRoutes;

const bottomLinks: LinkOptions[] = [
  {
    path: '/administration/flash-cards',
    title: 'Manage Flash Cards',
    icon: <StyleIcon />,
  },
  {
    path: '/administration/flash-cards-categories',
    title: 'Flash Card Categories',
    icon: <CategoryIcon />,
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const renderLinks = (links: LinkOptions[]) => (
  <List>
    {links.map((link) => (
      <ListItem key={link.path} component={Link} to={link.path} button>
        <ListItemIcon>{link.icon}</ListItemIcon>
        <ListItemText primary={link.title} />
      </ListItem>
    ))}
  </List>
);

const AppNavigationDrawer = observer((props: Props) => {
  const {open, onClose} = props;

  const userStore = React.useContext(UserStoreContext);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{width: 300}} onClick={onClose}>
        {renderLinks(upperLinks)}

        <Divider />

        {renderLinks(bottomLinks)}

        <Divider />

        <ListItem button onClick={() => userStore!.setToken(null)}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Drawer>
  );
});

export default AppNavigationDrawer;
