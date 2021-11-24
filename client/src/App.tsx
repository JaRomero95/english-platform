import React from 'react';
import AppBar from 'components/AppBar';
import AppRoutes from 'router/AppRoutes';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />

        <AppBar />

        <AppRoutes />
      </div>
    );
  }
}

export default App;
