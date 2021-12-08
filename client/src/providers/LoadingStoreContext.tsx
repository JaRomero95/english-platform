import React from 'react';
import LoadingStore from 'store/LoadingStore';

const LoadingStoreContext = React.createContext<LoadingStore | null>(null);

export default LoadingStoreContext;
