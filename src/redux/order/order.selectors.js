import { createSelector } from "reselect";

const selectOrder = state => state.order;

export const selectOrders = createSelector(
  [selectOrder],
  order => order.orders.orders
);

export const selectTotalPages = createSelector(
  [selectOrder],
  order => order.orders.totalPages
);

export const selectAreInitialOrdersLoaded = createSelector(
  [selectOrder],
  order => !!order.orders.orders.length
);

export const selectIsCrudOrderLoading = createSelector(
  [selectOrder],
  order => order.isCrudOrderLoading
);

export const selectIsCrudOrderSuccess = createSelector(
  [selectOrder],
  order => order.isCrudOrderSuccess
);

export const selectError = createSelector([selectOrder], order => order.error);
