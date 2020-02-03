import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

import AdminLinks from "../../components/admin-links/admin-links.component";
import Spinner from "../../components/spinner/spinner.component";

import "./adminpage.styles.scss";

const CreateNovelPage = lazy(() =>
  import("../create-novel/create-novel-page.component")
);

const AdminPage = ({ match }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminLinks />
        </div>
        <div className="col-md-9">
          <Suspense fallback={<Spinner />}>
            <Route
              exact
              path={`${match.path}/create-novel`}
              component={CreateNovelPage}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
