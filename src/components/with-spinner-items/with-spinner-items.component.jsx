import React from "react";
import LoadingOverlay from "react-loading-overlay";

import Spinner from "../spinner/spinner.component";

const WithSpinnerItems = WrappedComponent => ({
  isLoading,
  areInitialItemsLoaded,
  ...otherProps
}) => {
  return isLoading && !areInitialItemsLoaded ? (
    <Spinner />
  ) : (
    <LoadingOverlay active={isLoading} spinner={<Spinner />}>
      <WrappedComponent {...otherProps} />
    </LoadingOverlay>
  );
};

export default WithSpinnerItems;
