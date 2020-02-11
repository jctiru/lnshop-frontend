import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLightNovel } from "../../redux/novel/novel.selectors";
import { addItem } from "../../redux/cart/cart.actions";

const Novel = ({ novel, addItem }) => {
  const history = useHistory();

  return (
    <div className="container pb-5 mb-5">
      <button onClick={() => history.goBack()} className="btn btn-light m-1">
        <i className="fa fa-backward" /> Back
      </button>
      <br />
      <div className="card border-secondary mb-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={novel ? novel.imageUrl : ""}
              className="w-100"
              alt={novel ? novel.imageUrl : ""}
            />
          </div>
          <div className="col-md-5 p-3">
            <div className="card-body p-3">
              <h3 className="card-title text-primary">
                {novel ? novel.title : ""}
              </h3>
              <h6 className="card-subtitle mb-3 text-muted">
                {novel ? novel.genres.map(genre => genre.name + " ") : ""}
              </h6>
              <p className="card-text text-dark">
                {novel ? novel.description : ""}
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-secondary text-center m-4">
              <div className="card-header"></div>
              <div className="card-body">
                <h4 className="card-title mb-0 text-dark">
                  Price: ${novel ? novel.price : ""}
                </h4>
                <button
                  className="btn btn-sm btn-dark mt-2"
                  onClick={() => addItem(novel)}
                >
                  Add to Cart
                </button>
              </div>
              <div className="card-footer text-muted"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  novel: selectLightNovel
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(Novel);
