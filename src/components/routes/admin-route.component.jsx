import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";

const AdminRoute = ({ currentUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (currentUser !== null && currentUser.role === "ADMIN") {
        return <Component {...props} />;
      } else if (currentUser !== null) {
        return <Redirect to="/" />;
      } else {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
    }}
  />
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(AdminRoute);
