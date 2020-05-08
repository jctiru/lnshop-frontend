import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import UserRoute from "./components/routes/user-route.component";
import AdminRoute from "./components/routes/admin-route.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import ErrorDisplay from "./components/error-display/error-display.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

import "./App.css";

const HomePage = lazy(() => import("./pages/home/home-page.component"));
const AboutPage = lazy(() => import("./pages/about/about-page.component"));
const LoginPage = lazy(() => import("./pages/login/loginpage.component"));
const RegisterPage = lazy(() =>
  import("./pages/register/registerpage.component")
);
const ProfilePage = lazy(() =>
  import("./pages/profile/profile-page.component")
);
const AdminPage = lazy(() => import("./pages/admin/adminpage.component"));
const NovelsShopPage = lazy(() =>
  import("./pages/novels-shop/novels-shop-page.component")
);
const NovelPage = lazy(() => import("./pages/novel/novel-page.component"));
const CartPage = lazy(() => import("./pages/cart/cart-page.component"));
const EmailVerificationPage = lazy(() =>
  import("./pages/email-verification/email-verification-page.component")
);
const PasswordResetRequestPage = lazy(() =>
  import("./pages/password-reset-request/password-reset-request-page.component")
);
const PasswordResetPage = lazy(() =>
  import("./pages/password-reset/password-reset-page.component")
);

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <>
      <Header />
      <main>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/cart" component={CartPage} />
              <Route
                exact
                path="/login"
                render={(props) => {
                  if (currentUser) {
                    if (
                      typeof props.location.state !== "undefined" &&
                      currentUser.role !== "ADMIN" &&
                      props.location.state.from.pathname.startsWith("/admin")
                    ) {
                      return <Redirect to="/" />;
                    } else if (typeof props.location.state !== "undefined") {
                      return <Redirect to={props.location.state.from} />;
                    } else {
                      return <Redirect to="/" />;
                    }
                  } else {
                    return <LoginPage {...props} />;
                  }
                }}
              />
              <Route
                exact
                path="/register"
                render={() =>
                  currentUser ? <Redirect to="/" /> : <RegisterPage />
                }
              />
              <Route exact path="/novels" component={NovelsShopPage} />
              <Route exact path="/novels/show/:novelId" component={NovelPage} />
              <UserRoute path="/profile" component={ProfilePage} />
              <AdminRoute path="/admin" component={AdminPage} />
              <Route
                exact
                path="/email-verification"
                component={EmailVerificationPage}
              />
              <Route
                exact
                path="/login/password-reset-request"
                render={() =>
                  currentUser ? (
                    <Redirect to="/" />
                  ) : (
                    <PasswordResetRequestPage />
                  )
                }
              />
              <Route
                exact
                path="/password-reset-request"
                render={() =>
                  currentUser ? <Redirect to="/" /> : <PasswordResetPage />
                }
              />
              <Route
                render={() => <ErrorDisplay errorMessage="Page not found :(" />}
              />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
