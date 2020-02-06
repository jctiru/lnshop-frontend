import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsNovelsLoading,
  selectAreInitialNovelsLoaded
} from "../../redux/novel/novel.selectors";
import WithSpinnerNovels from "../with-spinner-novels/with-spinner-novels.component";
import Novels from "./novels.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsNovelsLoading,
  areInitialNovelsLoaded: selectAreInitialNovelsLoaded
});

const NovelsContainer = compose(
  connect(mapStateToProps),
  WithSpinnerNovels
)(Novels);

export default NovelsContainer;
