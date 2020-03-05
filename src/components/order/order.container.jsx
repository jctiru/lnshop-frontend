import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsCrudOrderLoading } from "../../redux/order/order.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Order from "./order.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCrudOrderLoading
});

const OrderContainer = compose(connect(mapStateToProps), WithSpinner)(Order);

export default OrderContainer;
