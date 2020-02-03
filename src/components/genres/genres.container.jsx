import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsGenresLoading } from "../../redux/novel/novel.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Genres from "./genres.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsGenresLoading
});

const GenresContainer = compose(connect(mapStateToProps), WithSpinner)(Genres);

export default GenresContainer;
