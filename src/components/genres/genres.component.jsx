import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectGenres } from "../../redux/novel/novel.selectors";

const Genres = ({ genresList }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleToggle = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <div className="form-group">
      <div className="mb-1">Genres:</div>
      {genresList.map(genre => (
        <div
          className="custom-control custom-checkbox col-md-6"
          key={genre.genreId}
        >
          <input
            className={`custom-control-input`}
            type="checkbox"
            onChange={handleToggle}
            value={genre.genreId}
            name={genre.genreId}
            id={genre.genreId}
            checked={!!checkedItems[genre.genreId]}
          />
          <label className="custom-control-label" htmlFor={genre.genreId}>
            {genre.name}
          </label>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  genresList: selectGenres
});

export default connect(mapStateToProps)(Genres);
