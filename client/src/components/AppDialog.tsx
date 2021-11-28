import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogAction from 'models/DialogAction';

interface Props {
  title: string;
  open: boolean;
  actions: DialogAction[];
  onClose: () => void;
}

class AppInput extends React.Component<Props> {
  render() {
    const {children, title, actions, open, onClose} = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>

        <DialogActions>
          {actions.map(({text, onClick}) => (
            <Button key={text} onClick={onClick}>
              {text}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    );
  }
}

export default AppInput;
