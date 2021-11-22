import React from 'react';
import AppNavBar from 'components/AppNavBar';
import AppRoutes from 'router/AppRoutes';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppNavBar />

        <AppRoutes />
      </div>
    );
  }
}

export default App;
