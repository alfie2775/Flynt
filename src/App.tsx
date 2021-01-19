import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
// import Main from "./components/Main";
// import Navigation from "./components/Navigation";
// import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Maintainance from "./components/Maintainance";
import { store, persistor } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <BrowserRouter>
          {/* <Switch>
            <Navigation />
              <Main />
            <Footer />
          </Switch> */}
          <Maintainance />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
