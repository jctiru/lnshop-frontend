import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsNovelLoading } from "../../redux/novel/novel.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Novel from "./novel.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsNovelLoading
});

const NovelContainer = compose(connect(mapStateToProps), WithSpinner)(Novel);

export default NovelContainer;
