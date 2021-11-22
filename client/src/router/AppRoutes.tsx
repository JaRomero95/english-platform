import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from 'pages/HomePage';
import IrregularVerbsPage from 'pages/IrregularVerbsPage';
import FlashCardsPage from 'pages/FlashCardsPage';

class AppRoutes extends React.Component {
  render() {
    return (
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="irregular-verbs" element={<IrregularVerbsPage />} />
        <Route path="flash-cards" element={<FlashCardsPage />} />
      </Routes>
    );
  }
}

export default AppRoutes;
