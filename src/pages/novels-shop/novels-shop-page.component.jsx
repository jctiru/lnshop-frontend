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
import Search from "../../components/search/search.component";
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
  const [page, setPage] = useState(1);
  const search = useRef(null);
  const queryStringObj = useRef({});
  const initialRender = useRef(true);
  const initialCheckedItems = useRef(false);

  // Fetch genres only once
  useEffect(() => {
    if (initialRender.current && genresList.length === 0) {
      getGenresStart();
    }
  }, [genresList.length, getGenresStart]);

  // After fetching genres, set genres checkboxes if present in URL Params
  useEffect(() => {
    if (initialRender.current) {
      return;
    }

    // queryStringObj.current.genres = { genres: ["Action", "Drama", ...]}
    if (typeof queryStringObj.current.genres !== "undefined") {
      // { Action: {name: "Action", genreId: "XXXXXXX"}, ...}
      const genresObj = genresList.reduce((acc, cv) => {
        acc[cv.name] = { name: cv.name, genreId: cv.genreId };
        return acc;
      }, {});
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

  //On initial render and every URL change, fetch novels based on URL Params and save URL Params for processing
  useEffect(() => {
    queryStringObj.current = queryString.parse(location.search);

    if (
      typeof queryStringObj.current.page !== "undefined" &&
      /^\d+$/.test(queryStringObj.current.page) &&
      parseInt(queryStringObj.current.page) > 0
    ) {
      setPage(parseInt(queryStringObj.current.page));
    } else {
      setPage(1);
    }

    if (typeof queryStringObj.current.genres === "string") {
      queryStringObj.current.genres = [queryStringObj.current.genres];
    }

    if (typeof queryStringObj.current.search !== "undefined") {
      search.current.value = queryStringObj.current.search;
    }

    getNovelsStart(location.search);
  }, [getNovelsStart, location.search]);

  // On checkboxes change except from initial change due to initial URL Params, change URL
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    checkedItemsGenreNames.current = Object.values(checkedItems)
      .filter(item => item.isChecked)
      .map(item => item.name);

    // Don't change URL on initial checkboxes change due to initial URL Params
    if (initialCheckedItems.current) {
      initialCheckedItems.current = false;
      return;
    }

    const searchValue = processSearchValue(search.current.value);
    const querySearch = queryString.stringify(
      { genres: checkedItemsGenreNames.current, search: searchValue },
      { skipNull: true }
    );
    history.push(location.pathname + "?" + querySearch);
  }, [checkedItems, history, location.pathname]);

  const handlePageClick = data => {
    const searchValue = processSearchValue(search.current.value);
    const querySearch = queryString.stringify(
      {
        page: data.selected + 1,
        genres: checkedItemsGenreNames.current,
        search: searchValue
      },
      { skipNull: true }
    );
    history.push(location.pathname + "?" + querySearch);
  };

  const handleSearchCLick = () => {
    const searchValue = processSearchValue(search.current.value);
    const querySearch = queryString.stringify(
      {
        genres: checkedItemsGenreNames.current,
        search: searchValue
      },
      { skipNull: true }
    );
    history.push(location.pathname + "?" + querySearch);
  };

  const processSearchValue = searchValue => {
    if (searchValue.trim() === "") {
      return null;
    } else {
      return searchValue;
    }
  };

  return (
    <>
      {/* Jumbotron */}
      <div className="container">
        <div
          id="books-index-jumbotron"
          className="jumbotron text-center py-4 mb-3"
        >
          <h1 className="text-white jumbotron-text-shadow">Light Novels</h1>
        </div>
      </div>

      <div className="container">
        <Search search={search} handleSearchClick={handleSearchCLick} />
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
        </div>
      </div>
    </>
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
