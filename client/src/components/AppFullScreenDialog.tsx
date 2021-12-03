import React from 'react';
import Button from '@mui/material/Button';
import {Dialog, Toolbar, IconButton, Typography, AppBar} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import styled from 'styled-components';

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
}

class AppFullScreenDialog extends React.Component<Props> {
  render() {
    const {children, title, open, onClose} = this.props;

    return (
      <Dialog fullScreen open={open} onClose={onClose}>
        <AppBar sx={{position: 'relative'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>

        <Content>{children}</Content>
      </Dialog>
    );
  }
}

const Content = styled.div`
  padding: 2rem 2rem;
`;

export default AppFullScreenDialog;
