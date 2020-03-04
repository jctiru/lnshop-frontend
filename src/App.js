import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import AdminRoute from "./components/routes/admin-route.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Spinner from "./components/spinner/spinner.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

import "./App.css";

const HomePage = lazy(() => import("./pages/home/home-page.component"));
const AboutPage = lazy(() => import("./pages/about/about-page.component"));
const LoginPage = lazy(() => import("./pages/login/loginpage.component"));
const RegisterPage = lazy(() =>
  import("./pages/register/registerpage.component")
);
const AdminPage = lazy(() => import("./pages/admin/adminpage.component"));
const NovelsShopPage = lazy(() =>
  import("./pages/novels-shop/novels-shop-page.component")
);
const NovelPage = lazy(() => import("./pages/novel/novel-page.component"));
const CartPage = lazy(() => import("./pages/cart/cart-page.component"));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/cart" component={CartPage} />
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
            <Route exact path="/novels" component={NovelsShopPage} />
            <Route exact path="/novels/show/:novelId" component={NovelPage} />
            <AdminRoute path="/admin" component={AdminPage} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
