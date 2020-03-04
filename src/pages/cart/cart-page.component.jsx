import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import LoadingOverlay from "react-loading-overlay";

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
  selectIsCrudOrderLoading,
  selectIsCrudOrderSuccess,
  selectError
} from "../../redux/order/order.selectors";
import {
  clearItemFromCart,
  addItem,
  removeItem
} from "../../redux/cart/cart.actions";
import { crudOrderStatusReset } from "../../redux/order/order.actions";
import CartLogin from "../../components/cart-login/cart-login.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import Spinner from "../../components/spinner/spinner.component";

import "./cart-page.styles.scss";

const CartPage = ({
  cartItems,
  total,
  currentUser,
  isCrudOrderLoading,
  isCrudOrderSuccess,
  error,
  clearItem,
  addItem,
  removeItem,
  crudOrderStatusReset
}) => {
  const initialRender = useRef(true);
  const history = useHistory();

  useEffect(() => {
    if (!initialRender.current) {
      return;
    }

    initialRender.current = false;

    if (isCrudOrderSuccess || error) {
      crudOrderStatusReset();
    }
  }, [isCrudOrderSuccess, error, crudOrderStatusReset]);

  return (
    <>
      {/* Jumbotron */}
      <div className="container">
        <div
          id="cart-page-jumbotron"
          className="jumbotron text-center py-4 mb-3"
        >
          <h1 className="text-white jumbotron-text-shadow">Cart</h1>
        </div>
      </div>
      <div className="container mt-2 mb-5 pb-5">
        <LoadingOverlay active={isCrudOrderLoading} spinner={<Spinner />}>
          {isCrudOrderSuccess ? (
            <div>
              <div className="alert alert-dismissible alert-success fade show">
                <button type="button" className="close" data-dismiss="alert">
                  &times;
                </button>
                Order successful! Thank you for buying, have a good read!
              </div>
            </div>
          ) : null}
          {error ? (
            <div>
              <div className="alert alert-dismissible alert-danger fade show">
                <button type="button" className="close" data-dismiss="alert">
                  &times;
                </button>
                Payment can't be processed. Something went wrong...
              </div>
            </div>
          ) : null}
          <div className="card border-secondary">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h5 className="mb-0">
                    <i className="fa fa-shopping-cart fa-lg"></i> Shopping Cart
                  </h5>
                </div>
                <div className="col-md-6">
                  <button
                    onClick={() => history.goBack()}
                    className="btn btn-dark btn-sm btn-block"
                  >
                    <i className="fa fa-backward" /> Continue shopping
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-7">
                  <h3 className="mb-0">Item</h3>
                </div>
                <div className="col-md-5">
                  <div className="row">
                    <div className="col-md-3 text-dark">Price</div>
                    <div className="col-md-3 text-dark">Quantity</div>
                    <div className="col-md-4 text-dark">Subtotal</div>
                  </div>
                </div>
              </div>
              {cartItems.length === 0 ? (
                <div className="text-center my-5 h1">EMPTY CART</div>
              ) : (
                cartItems.map(cartItem => (
                  <div key={cartItem.lightNovelId}>
                    <hr />
                    <div className="row">
                      <div className="col-md-1">
                        <Link to={`novels/show/${cartItem.lightNovelId}`}>
                          <img
                            className="img-fluid"
                            src={cartItem.imageUrl}
                            alt={cartItem.imageUrl}
                          />
                        </Link>
                      </div>
                      <div className="col-md-6">
                        <h5 className="mb-0">
                          <Link to={`novels/show/${cartItem.lightNovelId}`}>
                            <strong>{cartItem.title}</strong>
                          </Link>
                        </h5>
                        <p className="text-muted mb-0">
                          {cartItem.genres.map(genre => genre.name + " ")}
                        </p>
                      </div>
                      <div className="col-md-5">
                        <div className="row align-items-center">
                          <div className="col-md-3">
                            <h6 className="mb-0">
                              <strong>${cartItem.price}</strong>
                            </h6>
                          </div>
                          <div className="col-md-3 d-flex justify-content-start">
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => removeItem(cartItem)}
                            >
                              &#10094;
                            </div>
                            <span className="mx-1">
                              {cartItem.cartQuantity}
                            </span>
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => addItem(cartItem)}
                            >
                              &#10095;
                            </div>
                          </div>
                          <div className="col-md-3">
                            <h6 className="mb-0">
                              <strong>
                                ${cartItem.price * cartItem.cartQuantity}
                              </strong>
                            </h6>
                          </div>
                          <div className="col-md-3 text-center">
                            <button
                              type="button"
                              className="btn btn-link btn-sm cart-delete-button"
                              onClick={() => clearItem(cartItem)}
                            >
                              <i className="fa fa-trash-o fa-2x"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="card-footer text-muted">
              <div className="row align-items-center">
                <div className="col-md-9">
                  <h4 className="text-right mb-0">
                    Total: <strong>${total}</strong>
                  </h4>
                </div>
                <div className="col-md-3">
                  {currentUser ? (
                    <StripeCheckoutButton price={total} />
                  ) : (
                    <CartLogin />
                  )}
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  currentUser: selectCurrentUser,
  isCrudOrderLoading: selectIsCrudOrderLoading,
  isCrudOrderSuccess: selectIsCrudOrderSuccess,
  error: selectError
});

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item)),
  crudOrderStatusReset: () => dispatch(crudOrderStatusReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
