import './App.css';
import AppRouter from './components/Router';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import reducer from "./reducers/MainReducer";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const store = createStore(reducer
  , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  const persistor=persistStore(store);
function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;
