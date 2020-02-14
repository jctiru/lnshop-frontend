import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getGenresStart, getNovelStart } from "../../redux/novel/novel.actions";
import UpdateNovelContainer from "../../components/update-novel/update-novel.container";

const UpdateNovelPage = ({ getGenresStart, getNovelStart, match }) => {
  useEffect(() => {
    getGenresStart();
    getNovelStart(match.params.novelId);
  }, [getGenresStart, getNovelStart, match]);

  return <UpdateNovelContainer />;
};

const mapDispatchToProps = dispatch => ({
  getGenresStart: () => dispatch(getGenresStart()),
  getNovelStart: novelId => dispatch(getNovelStart({ novelId }))
});

export default connect(null, mapDispatchToProps)(UpdateNovelPage);
