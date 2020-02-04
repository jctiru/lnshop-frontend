import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";

import { getNovelStart } from "../../redux/novel/novel.actions";
import NovelContainer from "../../components/novel/novel.container";

const NovelPage = ({ getNovelStart, match }) => {
  useLayoutEffect(() => {
    getNovelStart(match.params.novelId);
  }, [getNovelStart, match]);

  return <NovelContainer />;
};

const mapDispatchToProps = dispatch => ({
  getNovelStart: novelId => dispatch(getNovelStart({ novelId }))
});

export default connect(null, mapDispatchToProps)(NovelPage);
