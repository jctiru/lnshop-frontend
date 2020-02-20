import { createSelector } from "reselect";

const selectOrder = state => state.order;

export const selectIsCrudOrderLoading = createSelector(
  [selectOrder],
  order => order.isCrudOrderLoading
);

export const selectIsCrudOrderSuccess = createSelector(
  [selectOrder],
  order => order.isCrudOrderSuccess
);

export const selectError = createSelector([selectOrder], order => order.error);
