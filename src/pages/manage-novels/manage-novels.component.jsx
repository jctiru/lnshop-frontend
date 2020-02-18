import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import queryString from "query-string";
import LoadingOverlay from "react-loading-overlay";
import ReactPaginate from "react-paginate";

import {
  selectTotalPages,
  selectIsCrudNovelLoading,
  selectIsCrudNovelSuccess,
  selectError
} from "../../redux/novel/novel.selectors";
import {
  getNovelsStart,
  crudNovelStatusReset
} from "../../redux/novel/novel.actions";
import Spinner from "../../components/spinner/spinner.component";
import ManageNovelsTableContainer from "../../components/manage-novels-table/manage-novels-table.container";

const ManageNovelsPage = ({
  totalPages,
  isCrudNovelLoading,
  isCrudNovelSuccess,
  error,
  getNovelsStart,
  crudNovelStatusReset
}) => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const history = useHistory();
  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      return;
    }

    initialRender.current = false;

    if (isCrudNovelSuccess || error) {
      crudNovelStatusReset();
    }
  }, [isCrudNovelSuccess, error, crudNovelStatusReset]);

  useEffect(() => {
    const queryStringObj = queryString.parse(location.search);

    if (
      typeof queryStringObj.page !== "undefined" &&
      /^\d+$/.test(queryStringObj.page) &&
      parseInt(queryStringObj.page) > 0
    ) {
      setPage(parseInt(queryStringObj.page));
    }

    getNovelsStart(location.search);
  }, [getNovelsStart, location.search]);

  const handlePageClick = data => {
    const querySearch = queryString.stringify(
      { page: data.selected + 1 },
      { skipNull: true }
    );
    history.push(location.pathname + "?" + querySearch);
  };

  return (
    <div className="container">
      <LoadingOverlay active={isCrudNovelLoading} spinner={<Spinner />}>
        {isCrudNovelSuccess ? (
          <div>
            <div className="alert alert-dismissible alert-success fade show">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              Novel successfully deleted!
            </div>
          </div>
        ) : null}
        {error ? (
          <div>
            <div className="alert alert-dismissible alert-danger fade show">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              Novel can't be deleted. Something went wrong...
            </div>
          </div>
        ) : null}
        <ManageNovelsTableContainer />
        <div className="container my-5">
          <div className="row">
            <div className="col-md-12">
              <ReactPaginate
                pageCount={totalPages}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                forcePage={page - 1}
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
      </LoadingOverlay>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  totalPages: selectTotalPages,
  isCrudNovelLoading: selectIsCrudNovelLoading,
  isCrudNovelSuccess: selectIsCrudNovelSuccess,
  error: selectError
});

const mapDispatchToProps = dispatch => ({
  getNovelsStart: urlParam => dispatch(getNovelsStart({ urlParam })),
  crudNovelStatusReset: () => dispatch(crudNovelStatusReset())
});

ManageNovelsPage.whyDidYouRender = {
  //logOnDifferentValues: true
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNovelsPage);
