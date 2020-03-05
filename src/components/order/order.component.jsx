import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import moment from "moment/min/moment.min";

import { selectOrderDetails } from "../../redux/order/order.selectors";

const Order = ({ order }) => {
  const history = useHistory();

  return (
    <div className="container mt-1 mb-5">
      {console.log(order)}
      <button onClick={() => history.goBack()} className="btn btn-light m-1">
        <i className="fa fa-backward" /> Back
      </button>
      <br />
      <div className="card border-secondary mb-xs-5 mt-xs-5">
        <div className="card-header align-items-center">
          <h3 className="mb-0">Order Details</h3>
        </div>
        {order ? (
          <div className="m-3">
            <div className="card border-secondary">
              <div className="card-header">
                <div>
                  <i className="mb-md-0 mb-sm-2">
                    <i className="fa fa-list-ul"></i>Order Id: {order.orderId}
                  </i>
                </div>
                <div>
                  <i className="mb-md-0 mb-sm-2">
                    <i className="fa fa-calendar"></i>Date:{" "}
                    {moment(order.createDateTime).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </i>
                </div>
              </div>
              <div className="card-body my-2">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h5>Customer Info</h5>
                      <span className="d-block">
                        {order.user.firstName} {order.user.lastName}
                      </span>
                      <span className="d-block">{order.user.email}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h5>Shipping Address</h5>
                      <span className="d-block">
                        {order.shippingAddress.line}
                      </span>
                      <span className="d-block">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.zip}
                      </span>
                      <span className="d-block">
                        {order.shippingAddress.country}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h5>Payment Method</h5>
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
                    <div className="mb-3">
                      <h5>Order Total</h5>
                      <span className="font-weight-bold">
                        <strong>${order.total}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr
              style={{ margin: "0 5%", borderColor: "inherit" }}
              className="my-3 border-secondary"
            />
            <div className="card border-secondary">
              <div className="card-header">
                <div>
                  <i className="mb-md-0 mb-sm-2">
                    <i className="fa fa-list-ul"></i>Order Items
                  </i>
                </div>
              </div>
              <div className="card-body my-2">
                <div className="row align-items-center">
                  <div className="col-md-7">
                    <h4 className="mb-0">Item</h4>
                  </div>
                  <div className="col-md-5">
                    <div className="row">
                      <div className="col-md-3 text-dark">Price</div>
                      <div className="col-md-3 text-dark">Quantity</div>
                      <div className="col-md-4 text-dark">Subtotal</div>
                    </div>
                  </div>
                </div>
                {order.orderItems.map(orderItem => (
                  <div key={orderItem.lightNovel.lightNovelId}>
                    <hr />
                    <div className="row">
                      <div className="col-md-1">
                        <Link
                          to={`/novels/show/${orderItem.lightNovel.lightNovelId}`}
                        >
                          <img
                            className="img-fluid"
                            src={orderItem.lightNovel.imageUrl}
                            alt={orderItem.lightNovel.imageUrl}
                          />
                        </Link>
                      </div>
                      <div className="col-md-6">
                        <h5 className="mb-0">
                          <Link
                            to={`/novels/show/${orderItem.lightNovel.lightNovelId}`}
                          >
                            <strong>{orderItem.lightNovel.title}</strong>
                          </Link>
                        </h5>
                        <p className="text-muted mb-0">
                          {orderItem.lightNovel.genres.map(
                            genre => genre.name + " "
                          )}
                        </p>
                      </div>
                      <div className="col-md-5">
                        <div className="row align-items-center">
                          <div className="col-md-3">
                            <h6 className="mb-0">
                              <strong>${orderItem.price}</strong>
                            </h6>
                          </div>
                          <div className="col-md-3 d-flex justify-content-start">
                            <span className="mx-1">{orderItem.quantity}</span>
                          </div>
                          <div className="col-md-3">
                            <h6 className="mb-0">
                              <strong>${orderItem.subtotal}</strong>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  order: selectOrderDetails
});

export default connect(mapStateToProps)(Order);
