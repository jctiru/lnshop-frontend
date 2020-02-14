import React, { useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import queryString from "query-string";
import ReactPaginate from "react-paginate";

import { getNovelsStart } from "../../redux/novel/novel.actions";
import { selectTotalPages } from "../../redux/novel/novel.selectors";
import ManageNovelsTableContainer from "../../components/manage-novels-table/manage-novels-table.container";

const ManageNovelsPage = ({ getNovelsStart, totalPages }) => {
  const page = useRef(1);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const queryStringObj = queryString.parse(location.search);

    if (
      typeof queryStringObj.page !== "undefined" &&
      /^\d+$/.test(queryStringObj.page) &&
      parseInt(queryStringObj.page) > 0
    ) {
      page.current = queryStringObj.page;
    }

    getNovelsStart(location.search);
  }, [getNovelsStart, location.search]);

  const handlePageClick = data => {
    page.current = data.selected + 1;
    const querySearch = queryString.stringify(
      { page: page.current },
      { skipNull: true }
    );
    history.push(location.pathname + "?" + querySearch);
  };

  return (
    <div className="container">
      <ManageNovelsTableContainer />
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
  );
};

const mapStateToProps = createStructuredSelector({
  totalPages: selectTotalPages
});

const mapDispatchToProps = dispatch => ({
  getNovelsStart: urlParam => dispatch(getNovelsStart({ urlParam }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageNovelsPage);
