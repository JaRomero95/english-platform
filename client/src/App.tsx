import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from 'router/AppRoutes';
import AppBar from 'components/AppBar';
import AppContentLayout from 'components/AppContentLayout';

class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />

        <AppBar />

        <AppContentLayout>
          <AppRoutes />
        </AppContentLayout>
      </div>
    );
  }
}

export default App;
