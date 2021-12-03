import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from 'router/AppRoutes';

class App extends React.Component {
  render() {
    return (
      <>
        <CssBaseline />

        <AppRoutes />
      </>
    );
  }
}

export default App;
