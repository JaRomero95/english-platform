import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from 'router/AppRoutes';
import UserStoreContext from 'providers/UserStoreContext';
import UserStore from 'store/UserStore';

const userStore = new UserStore();

function App() {
  return (
    <>
      <CssBaseline />

      <UserStoreContext.Provider value={userStore}>
        <AppRoutes />
      </UserStoreContext.Provider>
    </>
  );
}

export default App;
