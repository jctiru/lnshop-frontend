import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";

import { getNovelsStart } from "../../redux/novel/novel.actions";
import Search from "../../components/search/search.component";
import NovelsContainer from "../../components/novels/novels.container";

import "./home-page.styles.scss";

const HomePage = ({ getNovelsStart, history }) => {
  const search = useRef(null);

  useEffect(() => {
    getNovelsStart(null);
  });

  const handleSearchCLick = () => {
    const searchValue = processSearchValue(search.current.value);
    const querySearch = queryString.stringify(
      { search: searchValue },
      { skipNull: true }
    );
    history.push("/novels?" + querySearch);
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
          id="primary-jumbotron"
          className="jumbotron jumbotron-fluid text-center mb-3"
        >
          <div id="font-jumbotron-text" className="container py-5 my-5">
            <h1 className="text-white display-4 primary-jumbotron-text-shadow">
              The LNShop
            </h1>
            <p className="lead text-light">Go buy your favorite Light Novels</p>
          </div>
        </div>
      </div>

      {/* Searchbar */}
      <div className="container mb-5">
        <Search search={search} handleSearchClick={handleSearchCLick} />
      </div>

      {/* Featuring */}
      <div className="bg-dark pt-4 pb-3 mb-5 pt-md-5 pb-md-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-1 text-center mb-3 mb-md-0">
              <i className="fa fa-book fa-2x"></i>
            </div>
            <div className="col-sm-12 col-md-3 text-center text-md-left mb-3 mb-md-0">
              <p className="lead mb-0">
                We have a very wide selection of light novels.
              </p>
            </div>
            <div className="col-sm-12 col-md-1 text-center mb-3 mb-md-0">
              <i className="fa fa-usd fa-2x"></i>
            </div>
            <div className="col-sm-12 col-md-3 text-center text-md-left mb-3 mb-md-0">
              <p className="lead mb-0">
                Go get your light novels with competetive pricing.
              </p>
            </div>
            <div className="col-sm-12 col-md-1 text-center mb-3 mb-md-0">
              <i className="fa fa-line-chart fa-2x"></i>
            </div>
            <div className="col-sm-12 col-md-3 text-center text-md-left mb-3 mb-md-0">
              <p className="lead mb-0">
                We have up-to-date novels from all publishers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container-fluid pb-3">
        <div id="secondary-jumbotron" className="jumbotron">
          <h3 className="text-white">
            Browse through our collection of light novels
          </h3>
          <blockquote className="blockquote">
            <p className="mb-0">Books are a uniquely portable magic.</p>
            <div className="blockquote-footer">Stephen King</div>
          </blockquote>
          <p className="lead">
            <Link className="text-white" to="/novels">
              Browse light novels <i className="fa fa-long-arrow-right"></i>
            </Link>
          </p>
        </div>
      </div>

      {/* Latest Novels Section */}
      <hr style={{ margin: "0 5%", borderColor: "inherit" }} className="mb-5" />
      <div className="container mb-5">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="text-dark">Latest Light Novels</h2>
          </div>
        </div>
        <div className="row">
          <NovelsContainer />
        </div>
      </div>
      <hr style={{ margin: "0 5%", borderColor: "inherit" }} className="mb-5" />
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  getNovelsStart: urlParam => dispatch(getNovelsStart({ urlParam }))
});

export default connect(null, mapDispatchToProps)(HomePage);
