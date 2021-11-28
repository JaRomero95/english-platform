import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from 'pages/HomePage';
import IrregularVerbsPage from 'pages/IrregularVerbsPage';
import FlashCardsPage from 'pages/FlashCardsPage';
import FlashCardsAdministrationPage from 'pages/FlashCardsAdministrationPage';
import FlashCardsIndexPage from 'pages/FlashCardsIndexPage';
import FlashCardCategoriesPage from 'pages/FlashCardCategoriesPage';

class AppRoutes extends React.Component {
  render() {
    return (
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="irregular-verbs" element={<IrregularVerbsPage />} />
        <Route path="flash-cards" element={<FlashCardsPage />} />
        <Route path="administration">
          <Route path="flash-cards" element={<FlashCardsAdministrationPage />}>
            <Route path="categories" element={<FlashCardCategoriesPage />} />
            <Route index element={<FlashCardsIndexPage />} />
          </Route>
        </Route>
      </Routes>
    );
  }
}

export default AppRoutes;
