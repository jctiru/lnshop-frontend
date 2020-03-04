import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsNovelsLoading,
  selectAreInitialNovelsLoaded
} from "../../redux/novel/novel.selectors";
import WithSpinnerItems from "../with-spinner-items/with-spinner-items.component";
import ManageNovelsTable from "./manage-novels-table.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsNovelsLoading,
  areInitialItemsLoaded: selectAreInitialNovelsLoaded
});

const ManageNovelsTableContainer = compose(
  connect(mapStateToProps),
  WithSpinnerItems
)(ManageNovelsTable);

export default ManageNovelsTableContainer;
