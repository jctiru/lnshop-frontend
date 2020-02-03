import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsGenresLoading } from "../../redux/novel/novel.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CreateNovel from "./create-novel.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsGenresLoading
});

const CreateNovelContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CreateNovel);

export default CreateNovelContainer;
