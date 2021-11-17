import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from 'pages/HomePage';
import IrregularVerbsPage from 'pages/IrregularVerbsPage';
import AppNavBar from 'components/AppNavBar';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppNavBar />

        <Routes>
          <Route index element={<HomePage />} />
          <Route path="irregular-verbs" element={<IrregularVerbsPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
