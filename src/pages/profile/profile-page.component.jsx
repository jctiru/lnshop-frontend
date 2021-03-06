import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import ProfileLinks from "../../components/profile-links/profile-links.component";
import Spinner from "../../components/spinner/spinner.component";
import ErrorDisplay from "../../components/error-display/error-display.component";

const DashboardHome = lazy(() =>
  import("../../components/dashboard-home/dashboard-home.component")
);
const OrdersPage = lazy(() => import("../orders/orders-page.component"));
const OrderPage = lazy(() => import("../order/order-page.component"));

const ProfilePage = ({ match }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 mb-5">
          <ProfileLinks />
        </div>
        <div className="col-md-9">
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path={`${match.path}`} component={DashboardHome} />
              {/* <Route
              exact
              path={`${match.path}/manage-novels/:novelId`}
              component={UpdateNovelPage}
            /> */}
              <Route
                exact
                path={`${match.path}/orders`}
                component={OrdersPage}
              />
              <Route
                exact
                path={`${match.path}/orders/:orderId`}
                component={OrderPage}
              />
              <Route
                render={() => <ErrorDisplay errorMessage="Page not found :(" />}
              />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
