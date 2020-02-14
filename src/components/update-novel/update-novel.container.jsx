import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsGenresLoading,
  selectIsNovelLoading
} from "../../redux/novel/novel.selectors";
import WithSpinnerUpdateNovel from "../../components/with-spinner-update-novel/with-spinner-update-novel.component";
import UpdateNovel from "./update-novel.component";

const mapStateToProps = createStructuredSelector({
  areGenresLoading: selectIsGenresLoading,
  isNovelLoading: selectIsNovelLoading
});

const CreateNovelContainer = compose(
  connect(mapStateToProps),
  WithSpinnerUpdateNovel
)(UpdateNovel);

export default CreateNovelContainer;
