import {useContext, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import UserStoreContext from 'providers/UserStoreContext';
import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';
import IrregularVerbsPage from 'pages/IrregularVerbsPage';
import FlashCardsPage from 'pages/FlashCardsPage';
import FlashCardsIndexPage from 'pages/FlashCardsIndexPage';
import FlashCardCategoriesPage from 'pages/FlashCardCategoriesPage';
import DefaultLayout from 'layouts/DefaultLayout';

const AppRoutes = observer(() => {
  const navigate = useNavigate();
  const userStoreContext = useContext(UserStoreContext);
  const token = userStoreContext!.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [token]);

  return (
    <Routes>
      <Route index element={<DefaultLayout component={<HomePage />} />} />

      <Route path="login" element={<LoginPage />} />

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
});

export default AppRoutes;
