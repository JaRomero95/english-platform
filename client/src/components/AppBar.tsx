import React from 'react';
import {Link} from 'react-router-dom';
import MiuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import AppNavigationDrawer from 'components/AppNavigationDrawer';

interface Props {}

interface State {
  openDrawer: boolean;
}

class AppBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {openDrawer: false};
  }

  toggleDrawer = () => {
    this.setState((state) => ({openDrawer: !state.openDrawer}));
  };

  render() {
    const {openDrawer} = this.state;

    return (
      <div>
        <MiuiAppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
              onClick={this.toggleDrawer}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              <TitleLink to="/">English Platform</TitleLink>
            </Typography>

            <IconButton component={Link} to="/" size="large" color="inherit">
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </MiuiAppBar>

        <AppNavigationDrawer onClose={this.toggleDrawer} open={openDrawer} />
      </div>
    );
  }
}

const TitleLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export default AppBar;
