import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import moment from "moment/min/moment.min";

import { selectOrders } from "../../redux/order/order.selectors";

const Orders = ({ orders }) => {
  const location = useLocation();

  return (
    <div className="container mt-1 mb-5">
      <div className="card border-secondary mb-xs-5 mt-xs-5">
        <div className="card-header align-items-center">
          <h3 className="mb-0">Orders</h3>
        </div>
        <div className="m-3">
          {orders.map(order => (
            <div key={order.orderId}>
              <div className="card border-secondary">
                <div className="card-header">
                  <div>
                    <i className="mb-md-0 mb-sm-2">
                      <i className="fa fa-list-ul"></i>Order Id: {order.orderId}
                    </i>
                  </div>
                </div>
                <div className="card-body my-2">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-2">
                        <i className="fa fa-calendar"></i>Date:{" "}
                        {moment(order.createDateTime).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-2">
                        <i className="fa fa-money"></i>Total Price: $
                        {order.total}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-2">
                        <i className="fa fa-credit-card"></i>Payment Type:
                        <span className="text-capitalize">
                          {order.card.brand}
                        </span>{" "}
                        <span className="text-capitalize">
                          {order.card.funding}
                        </span>{" "}
                        ****
                        {order.card.last4}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-2">
                        <i className="fa fa-link"></i>
                        <Link to={`${location.pathname}/${order.orderId}`}>
                          <strong>View Details</strong>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr
                style={{ margin: "0 5%", borderColor: "inherit" }}
                className="my-3 border-secondary"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  orders: selectOrders
});

export default connect(mapStateToProps)(Orders);
