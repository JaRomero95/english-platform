import {useContext, useEffect} from 'react';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import UserStoreContext from 'providers/UserStoreContext';
import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';
import IrregularVerbsPage from 'pages/IrregularVerbsPage';
import FlashCardsPage from 'pages/FlashCardsPage';
import FlashCardsIndexPage from 'pages/FlashCardsIndexPage';
import FlashCardCategoriesPage from 'pages/FlashCardCategoriesPage';
import DefaultLayout from 'layouts/DefaultLayout';
import FullHeightLayout from 'layouts/FullHeightLayout';

const AppRoutes = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const userStoreContext = useContext(UserStoreContext);
  const token = userStoreContext!.token;

  useEffect(() => {
    if (token) {
      if (location.pathname === '/login') navigate('/');
    } else {
      navigate('/login');
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
          <FullHeightLayout
            title="Flash Cards"
            component={<FlashCardsPage />}
          />
        }
      />
      <Route
        path="administration/flash-cards"
        element={
          <DefaultLayout
            title="Manage Flash Cards"
            component={<FlashCardsIndexPage />}
          />
        }
      />
      <Route
        path="administration/flash-cards-categories"
        element={
          <DefaultLayout
            title="Flash Card Categories"
            component={<FlashCardCategoriesPage />}
          />
        }
      />
    </Routes>
  );
});

export default AppRoutes;
