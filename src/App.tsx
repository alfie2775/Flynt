import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Main from "./components/Main";
import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { store, persistor } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Navigation />
        <Main />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
