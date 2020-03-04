import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsCrudOrderLoading,
  selectAreInitialOrdersLoaded
} from "../../redux/order/order.selectors";
import WithSpinnerItems from "../with-spinner-items/with-spinner-items.component";
import Orders from "./orders.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCrudOrderLoading,
  areInitialItemsLoaded: selectAreInitialOrdersLoaded
});

const OrdersContainer = compose(
  connect(mapStateToProps),
  WithSpinnerItems
)(Orders);

export default OrdersContainer;
