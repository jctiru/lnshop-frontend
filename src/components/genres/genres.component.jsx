import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectGenres } from "../../redux/novel/novel.selectors";

const Genres = ({ genresList, checkedItems, setCheckedItems }) => {
  const handleToggle = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: {
        isChecked: event.target.checked,
        name: event.target.value,
        genreId: event.target.name
      }
    });
  };

  return (
    <div className="form-group">
      <h5 className="mb-1">
        <strong>Genres:</strong>
      </h5>
      {genresList.map(genre => (
        <div className="custom-control custom-switch" key={genre.genreId}>
          <input
            className={`custom-control-input`}
            type="checkbox"
            onChange={handleToggle}
            value={genre.name}
            name={genre.genreId}
            id={genre.genreId}
            //checked={!!checkedItems[genre.genreId].isChecked}
            checked={
              typeof checkedItems[genre.genreId] === "undefined"
                ? false
                : checkedItems[genre.genreId].isChecked
            }
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
