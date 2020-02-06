import React from "react";
import LoadingOverlay from "react-loading-overlay";

import Spinner from "../spinner/spinner.component";

const WithSpinnerNovels = WrappedComponent => ({
  isLoading,
  areInitialNovelsLoaded,
  ...otherProps
}) => {
  return isLoading && !areInitialNovelsLoaded ? (
    <Spinner />
  ) : (
    <LoadingOverlay active={isLoading} spinner={<Spinner />}>
      <WrappedComponent {...otherProps} />
    </LoadingOverlay>
  );
};

export default WithSpinnerNovels;
