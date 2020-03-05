import React, { useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";

import { getOrderStart } from "../../redux/order/order.actions";
import OrderContainer from "../../components/order/order.container";

const OrderPage = ({ getOrderStart, match }) => {
  const initialRender = useRef(true);

  useLayoutEffect(() => {
    if (!initialRender.current) {
      return;
    }

    initialRender.current = false;
    getOrderStart(match.params.orderId);
  }, [getOrderStart, match]);

  return <OrderContainer />;
};

const mapDispatchToProps = dispatch => ({
  getOrderStart: orderId => dispatch(getOrderStart({ orderId }))
});

OrderPage.whyDidYouRender = {
  //logOnDifferentValues: true
};

export default connect(null, mapDispatchToProps)(OrderPage);
