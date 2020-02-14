import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsNovelsLoading,
  selectAreInitialNovelsLoaded
} from "../../redux/novel/novel.selectors";
import WithSpinnerNovels from "../with-spinner-novels/with-spinner-novels.component";
import ManageNovelsTable from "./manage-novels-table.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsNovelsLoading,
  areInitialNovelsLoaded: selectAreInitialNovelsLoaded
});

const ManageNovelsTableContainer = compose(
  connect(mapStateToProps),
  WithSpinnerNovels
)(ManageNovelsTable);

export default ManageNovelsTableContainer;
