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
  const [page, setPage] = useState(1);
  const [genreParams, setGenreParams] = useState([]);
  const search = useRef(null);
  const initialRender = useRef(true);
  const initialCheckedItems = useRef(false);
  const userToggled = useRef(false);
  const previousGenreParamsRef = useRef(genreParams);

  // Fetch genres only once
  useEffect(() => {
    if (initialRender.current && genresList.length === 0) {
      getGenresStart();
    }
  }, [genresList.length, getGenresStart]);

  // If genres are already fetched, set genres checkboxes if present in URL Params
  useEffect(() => {
    if (genresList.length === 0) {
      return;
    }

    // Save current genre params for future comparison
    previousGenreParamsRef.current = genreParams;

    // Don't set genres checkboxes duplicately after URL changed, if genre checkboxes already changed due to user toggle
    if (userToggled.current) {
      userToggled.current = false;
      return;
    }

    // genreParams = ["Action", "Drama", ...]
    if (genreParams.length !== 0) {
      // { Action: {name: "Action", genreId: "XXXXXXX"}, ...}
      const genresObj = genresList.reduce((acc, cv) => {
        acc[cv.name] = { name: cv.name, genreId: cv.genreId };
        return acc;
      }, {});
      const checkedItemsObj = {};

      genreParams.forEach(genre => {
        if (typeof genresObj[genre] !== "undefined") {
          checkedItemsObj[genresObj[genre].genreId] = {
            isChecked: true,
            name: genre,
            genreId: genresObj[genre].genreId
          };
        }
      });
      setCheckedItems(checkedItemsObj);
    } else {
      setCheckedItems({});
    }

    // Indicate that checkbox change is due to initial URL Params, caused by either page load or history back/forward
    initialCheckedItems.current = true;
  }, [genresList, genreParams]);

  //On initial render and every URL change, fetch novels based on URL Params and save URL Params for processing
  useEffect(() => {
    const queryStringObj = queryString.parse(location.search);

    if (
      typeof queryStringObj.page !== "undefined" &&
      /^\d+$/.test(queryStringObj.page) &&
      parseInt(queryStringObj.page) > 0
    ) {
      setPage(parseInt(queryStringObj.page));
    } else {
      setPage(1);
    }

    // Compare previous value to current value before setting genre params
    if (
      typeof queryStringObj.genres !== "undefined" &&
      typeof queryStringObj.genres === "string"
    ) {
      if (
        JSON.stringify(previousGenreParamsRef.current) !==
        JSON.stringify([queryStringObj.genres])
      ) {
        setGenreParams([queryStringObj.genres]);
      }
    } else if (
      typeof queryStringObj.genres !== "undefined" &&
      Array.isArray(queryStringObj.genres)
    ) {
      if (
        JSON.stringify(previousGenreParamsRef.current) !==
        JSON.stringify(queryStringObj.genres)
      ) {
        setGenreParams(queryStringObj.genres);
      }
    } else {
      if (
        JSON.stringify(previousGenreParamsRef.current) !== JSON.stringify([])
      ) {
        setGenreParams([]);
      }
    }

    if (typeof queryStringObj.search !== "undefined") {
      search.current.value = queryStringObj.search;
    } else {
      search.current.value = null;
    }

    getNovelsStart(location.search);
  }, [getNovelsStart, location.search]);

  // On checkboxes change, only if user toggled, change URL
  useEffect(() => {
    // Don't run on initial render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // Don't change URL on initial checkboxes change due to initial URL Params
    if (initialCheckedItems.current) {
      initialCheckedItems.current = false;
      return;
    } else {
      // Indicate that change is due to user toggle
      userToggled.current = true;
    }

    const genreParamsArray = Object.values(checkedItems)
      .filter(item => item.isChecked)
      .map(item => item.name);

    const searchValue = processSearchValue(search.current.value);
    const querySearch = queryString.stringify(
      {
        genres: genreParamsArray,
        search: searchValue
      },
      { skipNull: true }
    );
    history.push(location.pathname + "?" + querySearch);
  }, [checkedItems, history, location.pathname]);

  const handlePageClick = data => {
    const searchValue = processSearchValue(search.current.value);
    const querySearch = queryString.stringify(
      {
        page: data.selected + 1,
        genres: genreParams,
        search: searchValue
      },
      { skipNull: true }
    );
    history.push(location.pathname + "?" + querySearch);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchCLick = () => {
    const searchValue = processSearchValue(search.current.value);
    const querySearch = queryString.stringify(
      {
        genres: genreParams,
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
