import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import queryString from "query-string";
import ReactPaginate from "react-paginate";

import {
  selectTotalPages,
  selectIsCrudOrderLoading,
  selectIsCrudOrderSuccess,
  selectError
} from "../../redux/order/order.selectors";
import {
  getOrdersStart,
  crudOrderStatusReset
} from "../../redux/order/order.actions";
import OrdersContainer from "../../components/orders/orders.container";

const OrdersPage = ({
  totalPages,
  isCrudOrderSuccess,
  error,
  getOrdersStart,
  crudOrderStatusReset
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

    if (isCrudOrderSuccess || error) {
      crudOrderStatusReset();
    }
  }, [isCrudOrderSuccess, error, crudOrderStatusReset]);

  useEffect(() => {
    const queryStringObj = queryString.parse(location.search);

    if (
      typeof queryStringObj.page !== "undefined" &&
      /^\d+$/.test(queryStringObj.page) &&
      parseInt(queryStringObj.page) > 0
    ) {
      setPage(parseInt(queryStringObj.page));
    }

    getOrdersStart("ADMIN", location.search);
  }, [getOrdersStart, location.search]);

  const handlePageClick = data => {
    const querySearch = queryString.stringify(
      { page: data.selected + 1 },
      { skipNull: true }
    );
    history.push(location.pathname + "?" + querySearch);
  };

  return (
    <div className="container">
      <OrdersContainer />
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
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  totalPages: selectTotalPages,
  isCrudOrderLoading: selectIsCrudOrderLoading,
  isCrudOrderSuccess: selectIsCrudOrderSuccess,
  error: selectError
});

const mapDispatchToProps = dispatch => ({
  getOrdersStart: (authority, urlParams) =>
    dispatch(getOrdersStart({ authority, urlParams })),
  crudOrderStatusReset: () => dispatch(crudOrderStatusReset())
});

OrdersPage.whyDidYouRender = {
  //logOnDifferentValues: true
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
