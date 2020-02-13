import React from "react";

const Search = ({ search, handleSearchClick }) => {
  const handleOnKeyUp = e => {
    if (e.keyCode === 13) {
      // Enter key
      handleSearchClick();
    }
  };

  return (
    <div className="row">
      <div className="col-md-10 mb-1">
        <input
          ref={search}
          type="text"
          className="form-control"
          placeholder="Light Novel Name"
          onKeyUp={e => handleOnKeyUp(e)}
        />
      </div>
      <div className="col-md-2 mb-1">
        <button
          onClick={handleSearchClick}
          className="btn btn-outline-dark btn-block"
        >
          <i className="fa fa-search"></i> Search
        </button>
      </div>
    </div>
  );
};

export default Search;
