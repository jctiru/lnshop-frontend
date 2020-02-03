import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getGenresStart } from "../../redux/novel/novel.actions";
import CreateNovelContainer from "../../components/create-novel/create-novel.container";

const CreateNovelPage = ({ getGenresStart }) => {
  useEffect(() => {
    getGenresStart();
  }, [getGenresStart]);

  return <CreateNovelContainer />;
};

const mapDispatchToProps = dispatch => ({
  getGenresStart: () => dispatch(getGenresStart())
});

export default connect(null, mapDispatchToProps)(CreateNovelPage);
