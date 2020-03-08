import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";

const DashboardHome = ({ user }) => {
  return (
    <div className="container mt-1 mb-5">
      <div className="card border-secondary mb-xs-5 mt-xs-5">
        <div className="card-header align-items-center">
          <h2 className="mb-0 text-capitalize">Dashboard Home</h2>
        </div>
        <div className="card-body">
          <span className="h4">
            Hello, {user.firstName} {user.lastName}
          </span>
          <br />
          <span className="h4">{user.email}</span>
          <br />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

export default connect(mapStateToProps)(DashboardHome);
