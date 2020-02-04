import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";

import {
  getGenresStart,
  getNovelsStart
} from "../../redux/novel/novel.actions";
import GenresContainer from "../../components/genres/genres.container";
import NovelsContainer from "../../components/novels/novels.container";

const NovelsShopPage = ({ getGenresStart, getNovelsStart }) => {
  useLayoutEffect(() => {
    getGenresStart();
    getNovelsStart();
  }, [getGenresStart, getNovelsStart]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <GenresContainer />
        </div>
        <div className="col-md-9">
          <NovelsContainer />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getGenresStart: () => dispatch(getGenresStart()),
  getNovelsStart: () => dispatch(getNovelsStart())
});

export default connect(null, mapDispatchToProps)(NovelsShopPage);
