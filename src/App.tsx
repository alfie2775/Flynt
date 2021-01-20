import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import RecentCodes from "./components/RecentCodes";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
// import Maintainance from "./components/Maintainance";
import { store, persistor } from "./redux/store";
import DetailedRecentCode from "./components/DetailedRecentCode";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/recent-codes" component={RecentCodes} />
            <Route
              exact
              path="/recent-codes/:codeId"
              component={DetailedRecentCode}
            />
            <Redirect to="/" />
          </Switch>
          <Footer />
          {/* <Maintainance /> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
