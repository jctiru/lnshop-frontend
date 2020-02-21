import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import StripeCheckout from "react-stripe-checkout";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createOrderStart } from "../../redux/order/order.actions";

const StripeCheckoutButton = ({
  price,
  disabled = false,
  currentUser,
  createOrderStart
}) => {
  const publishableKey = "pk_test_k0zjPzo8Fm45BDMd2HBZ9sZP005Wtc69HN";
  const onToken = (token, addressArgs) => {
    createOrderStart(token.id, addressArgs);
  };

  return (
    <StripeCheckout
      name="LNSHOP"
      description={`Your total is $${price}`}
      panelLabel="Pay Now"
      billingAddress
      shippingAddress
      email={currentUser.email}
      amount={price * 100}
      token={onToken}
      stripeKey={publishableKey}
      disabled={disabled}
    >
      <button className="btn btn-success btn-block">
        <i className="fa fa-shopping-basket"></i> Checkout
      </button>
    </StripeCheckout>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  createOrderStart: (stripeTokenId, addressArgs) =>
    dispatch(createOrderStart({ stripeTokenId, addressArgs }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StripeCheckoutButton);
