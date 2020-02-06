import React, { useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import queryString from "query-string";
import ReactPaginate from "react-paginate";

import {
  getGenresStart,
  getNovelsStart
} from "../../redux/novel/novel.actions";
import {
  selectGenres,
  selectTotalPages
} from "../../redux/novel/novel.selectors";
import GenresContainer from "../../components/genres/genres.container";
import NovelsContainer from "../../components/novels/novels.container";

import "./novels-shop-page.styles.scss";

const NovelsShopPage = ({
  genresList,
  totalPages,
  getGenresStart,
  getNovelsStart,
  location,
  history
}) => {
  //const [page, setPage] = useState(1)
  const page = useRef(4);
  const search = useRef(null);
  const genres = useRef(genresList);

  useLayoutEffect(() => {
    if (Array.isArray(genres.current) && genres.current.length === 0) {
      getGenresStart();
    }
  }, [getGenresStart]);

  useLayoutEffect(() => {
    const queryA = queryString.parse(location.search);

    if (
      typeof queryA.page !== "undefined" &&
      /^\d+$/.test(queryA.page) &&
      parseInt(queryA.page) > 0
    ) {
      page.current = queryA.page;
    }
  }, [location.search]);

  useLayoutEffect(() => {
    getNovelsStart(page.current);
  }, [getNovelsStart]);

  const handlePageClick = data => {
    page.current = data.selected + 1;
    const querySearch = queryString.stringify(
      { page: page.current },
      { skipNull: true }
    );
    history.push(location.pathname + "?" + querySearch);
    getNovelsStart(page.current);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <GenresContainer />
        </div>
        <div className="col-md-9">
          <NovelsContainer />
          <div className="container my-5">
            <div className="row">
              <div className="col-md-12">
                <ReactPaginate
                  pageCount={totalPages}
                  marginPagesDisplayed={3}
                  pageRangeDisplayed={3}
                  forcePage={parseInt(page.current) - 1}
                  onPageChange={handlePageClick}
                  disableInitialCallback={true}
                  containerClassName={"pagination justify-content-center"}
                  subContainerClassName={"pages pagination"}
                  previousLabel="&lsaquo;"
                  nextLabel="&rsaquo;"
                  breakLabel={"..."}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  genresList: selectGenres,
  totalPages: selectTotalPages
});

const mapDispatchToProps = dispatch => ({
  getGenresStart: () => dispatch(getGenresStart()),
  getNovelsStart: page => dispatch(getNovelsStart({ page }))
});

export default connect(mapStateToProps, mapDispatchToProps)(NovelsShopPage);
