import {observer} from 'mobx-react-lite';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from 'router/AppRoutes';
import AppLoading from 'components/AppLoading';
import UserStoreContext from 'providers/UserStoreContext';
import LoadingStoreContext from 'providers/LoadingStoreContext';
import UserStore from 'store/UserStore';
import LoadingStore from 'store/LoadingStore';

const userStore = new UserStore();
const loadingStore = new LoadingStore();

const App = observer(() => {
  return (
    <>
      <CssBaseline />

      <UserStoreContext.Provider value={userStore}>
        <LoadingStoreContext.Provider value={loadingStore}>
          <AppRoutes />
        </LoadingStoreContext.Provider>
      </UserStoreContext.Provider>

      <AppLoading show={loadingStore.isLoading} />
    </>
  );
});

export default App;
