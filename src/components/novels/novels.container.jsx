import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsNovelsLoading,
  selectAreInitialNovelsLoaded
} from "../../redux/novel/novel.selectors";
import WithSpinnerItems from "../with-spinner-items/with-spinner-items.component";
import Novels from "./novels.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsNovelsLoading,
  areInitialItemsLoaded: selectAreInitialNovelsLoaded
});

const NovelsContainer = compose(
  connect(mapStateToProps),
  WithSpinnerItems
)(Novels);

export default NovelsContainer;
