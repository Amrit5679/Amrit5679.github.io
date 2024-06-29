import AppRouter from "./Routers/appRouter"; 
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import Store from "./Redux/store";
import { initializeAuthListener } from './Redux/Actions/auth';

function WrappedApp () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuthListener());
  }, [dispatch]);

  return <AppRouter />;
};

function App() {
  return (
    <Provider store={Store}>
          <WrappedApp/>
    </Provider>
  );
}
export default App;