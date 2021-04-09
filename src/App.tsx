import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import "font-awesome/css/font-awesome.css";
import Main from "./components/Main";
import RecentCodes from "./components/RecentCodes";
import Navigation from "./components/Navigation";
import SharedCode from "./components/SharedCode";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import SavedCodes from "./components/SavedCodes";
// import Maintainance from "./components/Maintainance";
import { store, persistor } from "./redux/store";
import DetailedRecentCode from "./components/DetailedRecentCode";
import { getUserName } from "./others/helper";
import DetailedSavedCode from "./components/DetailedSavedCode";

const App: React.FC = () => {
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
            <Route
              exact
              path="/saved-codes"
              component={() =>
                getUserName() !== null ? <SavedCodes /> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/saved-codes/:codeId"
              render={(props) =>
                getUserName() !== null ? (
                  <DetailedSavedCode {...props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route exact path="/shared/:codeId" component={SharedCode} />
            <Redirect to="/" />
          </Switch>
          <Footer />
          {/* <Maintainance /> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
