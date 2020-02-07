import React, { useState, useRef, useEffect } from "react";
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
  const [checkedItems, setCheckedItems] = useState({});
  const checkedItemsGenreNames = useRef([]);
  const page = useRef(1);
  const search = useRef(null);
  const queryStringObj = useRef({});
  const initialRender = useRef(true);
  const initialCheckedItems = useRef(false);

  console.log("RENDERED!!!!!!!!!!!!!!!!!");

  useEffect(() => {
    if (initialRender.current && genresList.length === 0) {
      getGenresStart();
    }
  }, [genresList.length, getGenresStart]);

  useEffect(() => {
    if (initialRender.current) {
      return;
    }

    // { Action: {name: "Action", genreId: "XXXXXXX"}, ...}
    const genresObj = genresList.reduce((acc, cv) => {
      acc[cv.name] = { name: cv.name, genreId: cv.genreId };
      return acc;
    }, {});

    // queryStringObj.current.genres = { genres: ["Action", "Drama", ...], ...}
    if (typeof queryStringObj.current.genres !== "undefined") {
      const checkedItemsObj = {};

      queryStringObj.current.genres.forEach(genre => {
        if (typeof genresObj[genre] !== "undefined") {
          checkedItemsObj[genresObj[genre].genreId] = {
            isChecked: true,
            name: genre,
            genreId: genresObj[genre].genreId
          };
        }
      });

      initialCheckedItems.current = true;
      setCheckedItems(checkedItemsObj);
    }
  }, [genresList]);

  useEffect(() => {
    queryStringObj.current = queryString.parse(location.search);

    if (
      typeof queryStringObj.current.page !== "undefined" &&
      /^\d+$/.test(queryStringObj.current.page) &&
      parseInt(queryStringObj.current.page) > 0
    ) {
      page.current = queryStringObj.current.page;
    }

    if (typeof queryStringObj.current.genres === "string") {
      queryStringObj.current.genres = [queryStringObj.current.genres];
    }

    getNovelsStart(location.search);
  }, [getNovelsStart, location.search]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (initialCheckedItems.current) {
      initialCheckedItems.current = false;
      return;
    }

    page.current = 1;
    checkedItemsGenreNames.current = Object.values(checkedItems)
      .filter(item => item.isChecked)
      .map(item => item.name);
    const querySearch = queryString.stringify(
      { genres: checkedItemsGenreNames.current },
      { skipNull: true }
    );
    history.push(location.pathname + "?" + querySearch);
  }, [checkedItems, history, location.pathname]);

  const handlePageClick = data => {
    page.current = data.selected + 1;
    const querySearch = queryString.stringify(
      { page: page.current, genres: checkedItemsGenreNames.current },
      { skipNull: true }
    );
    history.push(location.pathname + "?" + querySearch);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <GenresContainer
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
        </div>
        <div className="col-md-10">
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
  getNovelsStart: urlParam => dispatch(getNovelsStart({ urlParam }))
});

NovelsShopPage.whyDidYouRender = {
  //logOnDifferentValues: true
};

export default connect(mapStateToProps, mapDispatchToProps)(NovelsShopPage);
