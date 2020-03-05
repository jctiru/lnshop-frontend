import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";

import { getOrderStart } from "../../redux/order/order.actions";
import OrderContainer from "../../components/order/order.container";

const OrderPage = ({ getOrderStart, match }) => {
  useLayoutEffect(() => {
    getOrderStart(match.params.orderId);
  }, [getOrderStart, match]);

  return <OrderContainer />;
};

const mapDispatchToProps = dispatch => ({
  getOrderStart: orderId => dispatch(getOrderStart({ orderId }))
});

export default connect(null, mapDispatchToProps)(OrderPage);
