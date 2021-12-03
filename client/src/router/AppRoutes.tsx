import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from 'pages/HomePage';
import IrregularVerbsPage from 'pages/IrregularVerbsPage';
import FlashCardsPage from 'pages/FlashCardsPage';
import FlashCardsIndexPage from 'pages/FlashCardsIndexPage';
import FlashCardCategoriesPage from 'pages/FlashCardCategoriesPage';
import DefaultLayout from 'layouts/DefaultLayout';

class AppRoutes extends React.Component {
  render() {
    return (
      <Routes>
        <Route index element={<DefaultLayout component={<HomePage />} />} />
        <Route
          path="irregular-verbs"
          element={
            <DefaultLayout
              title="Irregular Verbs"
              component={<IrregularVerbsPage />}
            />
          }
        />
        <Route
          path="flash-cards"
          element={
            <DefaultLayout title="Flash Cards" component={<FlashCardsPage />} />
          }
        />
        <Route
          path="administration/flash-cards"
          element={
            <DefaultLayout
              title="FlashCardsIndexPage"
              component={<FlashCardsIndexPage />}
            />
          }
        />
        <Route
          path="administration/flash-cards-categories"
          element={
            <DefaultLayout
              title="FlashCardCategoriesPage"
              component={<FlashCardCategoriesPage />}
            />
          }
        />
      </Routes>
    );
  }
}

export default AppRoutes;
