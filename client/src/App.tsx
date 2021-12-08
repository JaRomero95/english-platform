import {observer} from 'mobx-react-lite';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from 'router/AppRoutes';
import AppLoading from 'components/AppLoading';
import UserStoreContext from 'providers/UserStoreContext';
import UserStore from 'store/UserStore';
import LoadingStore from 'store/LoadingStore';

const userStore = new UserStore();
const loadingStore = new LoadingStore();

const App = observer(() => {
  return (
    <>
      <CssBaseline />

      <AppLoading show={loadingStore.isLoading} />

      <UserStoreContext.Provider value={userStore}>
        <AppRoutes />
      </UserStoreContext.Provider>
    </>
  );
});

export default App;
