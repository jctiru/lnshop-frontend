import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
  clearItemFromCart,
  addItem,
  removeItem
} from "../../redux/cart/cart.actions";

import "./cart-page.styles.scss";

const CartPage = ({
  cartItems,
  total,
  currentUser,
  clearItem,
  addItem,
  removeItem
}) => {
  const history = useHistory();

  return (
    <>
      {/* Jumbotron */}
      <div class="container">
        <div id="cart-page-jumbotron" class="jumbotron text-center py-4 mb-3">
          <h1 class="text-white jumbotron-text-shadow">Cart</h1>
        </div>
      </div>
      <div className="container mt-2 mb-5 pb-5">
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
            {cartItems.map(cartItem => (
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
                        <span className="mx-1">{cartItem.cartQuantity}</span>
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
            ))}
          </div>
          <div className="card-footer text-muted">
            <div className="row align-items-center">
              <div className="col-md-9">
                <h4 className="text-right mb-0">
                  Total: <strong>${total}</strong>
                </h4>
              </div>
              <div className="col-md-3">
                <button
                  id="checkout-button"
                  className="btn btn-success btn-block"
                >
                  <i className="fa fa-shopping-basket"></i> Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
