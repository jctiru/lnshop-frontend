import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { signOutStart } from "../../redux/user/user.actions";

const Header = ({ currentUser, cartItemsCount, signOutStart }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
    <div className="container">
      <Link className="navbar-brand" to="/">
        LNSHOP
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/novels">
              Novels
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              <i className="fa fa-shopping-cart fa-lg"></i>
              {cartItemsCount} Cart
            </Link>
          </li>
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              {currentUser.role === "ADMIN" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              ) : null}
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  style={{ lineHeight: "1.5", letterSpacing: "1px" }}
                  onClick={signOutStart}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItemsCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
