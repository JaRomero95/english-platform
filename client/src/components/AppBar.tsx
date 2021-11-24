import React from 'react';
import {Link} from 'react-router-dom';
import MiuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import styled from 'styled-components';

const TitleLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

class AppBar extends React.Component {
  render() {
    return (
      <MiuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <TitleLink to="/">English Platform</TitleLink>
          </Typography>

          <IconButton component={Link} to="/" size="large" color="inherit">
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </MiuiAppBar>
    );
  }
}

export default AppBar;
