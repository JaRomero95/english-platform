import React from 'react';
import MuteStore from 'store/MuteStore';

const MuteStoreContext = React.createContext<MuteStore | null>(null);

export default MuteStoreContext;
