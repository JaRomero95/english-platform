import React from 'react';
import UserStore from 'store/UserStore';

const UserStoreContext = React.createContext<UserStore | null>(null);

export default UserStoreContext;
