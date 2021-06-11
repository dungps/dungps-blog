import React, { useContext } from 'react';
import AppRouter from 'routers';
import { AppContext } from './context/context';
import { Spinner } from '../components';
import { Page404Component } from '../views';

const App = () => {
    const { state } = useContext(AppContext);

    if (state.error.isError) {
        return <Page404Component />
    }

    if (state.bootstrap.loading) {
        return <Spinner style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }} />;
    }

    return <AppRouter />;
};

export default App;