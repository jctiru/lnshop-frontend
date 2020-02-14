import React from "react";

import Spinner from "../spinner/spinner.component";

const WithSpinnerUpdateNovel = WrappedComponent => ({
  areGenresLoading,
  isNovelLoading,
  ...otherProps
}) => {
  return areGenresLoading || isNovelLoading ? (
    <Spinner />
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinnerUpdateNovel;
