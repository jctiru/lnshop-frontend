import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import AdminRoute from "./components/routes/admin-route.component";
import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

import "./App.css";

const LoginPage = lazy(() => import("./pages/login/loginpage.component"));
const RegisterPage = lazy(() =>
  import("./pages/register/registerpage.component")
);
const AdminPage = lazy(() => import("./pages/admin/adminpage.component"));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route
            exact
            path="/login"
            render={props =>
              currentUser ? <Redirect to="/" /> : <LoginPage {...props} />
            }
          />
          <Route
            exact
            path="/register"
            render={() =>
              currentUser ? <Redirect to="/" /> : <RegisterPage />
            }
          />
          <AdminRoute path="/admin" component={AdminPage} />
        </Switch>
      </Suspense>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
