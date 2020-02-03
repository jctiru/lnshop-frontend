import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsNovelsLoading } from "../../redux/novel/novel.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Novels from "./novels.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsNovelsLoading
});

const NovelsContainer = compose(connect(mapStateToProps), WithSpinner)(Novels);

export default NovelsContainer;
