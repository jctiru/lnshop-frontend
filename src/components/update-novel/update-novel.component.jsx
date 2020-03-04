import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import LoadingOverlay from "react-loading-overlay";
import moment from "moment/min/moment.min";

import {
  selectGenres,
  selectLightNovel,
  selectIsCrudNovelLoading,
  selectIsCrudNovelSuccess,
  selectError
} from "../../redux/novel/novel.selectors";
import {
  updateNovelStart,
  crudNovelStatusReset
} from "../../redux/novel/novel.actions";
import Spinner from "../../components/spinner/spinner.component";

const UpdateNovel = ({
  genresList,
  lightNovel,
  error,
  isCrudNovelLoading,
  isCrudNovelSuccess,
  updateNovelStart,
  crudNovelStatusReset
}) => {
  const [novel, setNovel] = useState({
    image: "",
    imageFile: {},
    imagePreview: "",
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    genres: []
  });
  const [checkedItems, setCheckedItems] = useState({});
  const [errors, setErrors] = useState({});
  const initialRender = useRef(true);
  const history = useHistory();

  const {
    image,
    imageFile,
    imagePreview,
    title,
    description,
    price,
    quantity,
    genres
  } = novel;

  useEffect(() => {
    if (!initialRender.current) {
      return;
    }

    if (isCrudNovelSuccess || error) {
      crudNovelStatusReset();
    }
  }, [isCrudNovelSuccess, error, crudNovelStatusReset]);

  useEffect(() => {
    if (initialRender.current) {
      return;
    }

    let errorObject = {};
    if (
      error !== null &&
      error.errors !== null &&
      Array.isArray(error.errors)
    ) {
      errorObject = error.errors.reduce((acc, cv) => {
        acc[Object.keys(cv)[0]] = cv[Object.keys(cv)[0]];
        return acc;
      }, {});
    }

    setErrors(errorObject);
  }, [error]);

  useEffect(() => {
    if (lightNovel == null) {
      return;
    }

    setNovel(novel => ({
      ...novel,
      imagePreview: lightNovel.imageUrl,
      title: lightNovel.title,
      description: lightNovel.description,
      price: lightNovel.price,
      quantity: lightNovel.quantity
    }));

    const checkedItemsObj = lightNovel.genres.reduce((acc, cv) => {
      acc[cv.genreId] = true;
      return acc;
    }, {});

    setCheckedItems(checkedItemsObj);
  }, [lightNovel]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setNovel(novel => ({
      ...novel,
      genres: Object.keys(checkedItems).filter(k => checkedItems[k])
    }));
  }, [checkedItems]);

  const handleChange = event => {
    const { name, value } = event.target;

    setNovel({
      ...novel,
      image:
        event.target.files && event.target.files.length > 0
          ? event.target.files[0]
          : image,
      imageFile:
        event.target.files && event.target.files.length > 0
          ? event.target.files[0]
          : imageFile,
      imagePreview:
        event.target.files && event.target.files.length > 0
          ? URL.createObjectURL(event.target.files[0])
          : imagePreview,
      [name]: value
    });
  };

  const handleToggle = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.set("image", imageFile);
    }
    formData.set("title", title);
    formData.set("description", description);
    formData.set("price", price);
    formData.set("quantity", quantity);
    genres.forEach(genreId => formData.append("genresIdList", genreId));

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    updateNovelStart(lightNovel.lightNovelId, formData);
  };

  return (
    <div className="container">
      <button onClick={() => history.goBack()} className="btn btn-light m-1">
        <i className="fa fa-backward" /> Back
      </button>
      <br />
      <div className="row">
        <div className="col-md-12 mx-auto">
          <LoadingOverlay active={isCrudNovelLoading} spinner={<Spinner />}>
            {isCrudNovelSuccess ? (
              <div>
                <div className="alert alert-dismissible alert-success fade show">
                  <button type="button" className="close" data-dismiss="alert">
                    &times;
                  </button>
                  Novel successfully updated! Updated time:{" "}
                  {moment(isCrudNovelSuccess.updateDateTime).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                  .
                </div>
              </div>
            ) : null}
            <div className="card card-body bg-light mt-2 mb-5">
              <h2 className="text-dark">Update Novel</h2>
              <p>Update novel with this form</p>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="image">
                        Image <sup>*</sup> <em>Max 300KB</em>
                      </label>
                      <input
                        type="hidden"
                        name="MAX_FILE_SIZE"
                        value={300000}
                      />
                      <input
                        id="inputImage"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className={`form-control-file form-control form-control-sm ${
                          errors.image ? "is-invalid" : ""
                        }`}
                        value={image}
                      />
                      <span className="invalid-feedback">{errors.image}</span>
                      <hr />
                      <img
                        src={imagePreview}
                        className="w-100"
                        alt="Upload Preview"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label htmlFor="title">
                        Name <sup>*</sup>
                      </label>
                      <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        className={`form-control form-control-sm ${
                          errors.title ? "is-invalid" : ""
                        }`}
                        value={title}
                      />
                      <span className="invalid-feedback">{errors.title}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">
                        Description: <sup>*</sup>
                      </label>
                      <textarea
                        name="description"
                        onChange={handleChange}
                        className={`form-control form-control-sm ${
                          errors.description ? "is-invalid" : ""
                        }`}
                        value={description}
                      />
                      <span className="invalid-feedback">
                        {errors.description}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">
                        Price: <sup>*</sup>
                      </label>
                      <input
                        type="number"
                        name="price"
                        onChange={handleChange}
                        className={`form-control form-control-sm ${
                          errors.price ? "is-invalid" : ""
                        }`}
                        value={price}
                      />
                      <span className="invalid-feedback">{errors.price}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="quantity">
                        Quantity: <sup>*</sup>
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        onChange={handleChange}
                        className={`form-control form-control-sm ${
                          errors.quantity ? "is-invalid" : ""
                        }`}
                        value={quantity}
                      />
                      <span className="invalid-feedback">
                        {errors.quantity}
                      </span>
                    </div>
                    <div className="form-group">
                      <div className="mb-1">
                        Genres: <sup>*</sup>
                      </div>
                      <span className="invalid-feedback d-block">
                        {errors.genresIdList}
                      </span>
                      <div className="form-check">
                        <div className="row">
                          {genresList.map(genre => (
                            <div
                              className="custom-control custom-checkbox col-md-6"
                              key={genre.genreId}
                            >
                              <input
                                className={`custom-control-input ${
                                  errors.genresIdList ? "is-invalid" : ""
                                }`}
                                type="checkbox"
                                onChange={handleToggle}
                                value={genre.genreId}
                                name={genre.genreId}
                                id={genre.genreId}
                                checked={!!checkedItems[genre.genreId]}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={genre.genreId}
                              >
                                {genre.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  className="btn btn-success"
                  name="submit"
                  value="Submit"
                />
              </form>
            </div>
          </LoadingOverlay>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  genresList: selectGenres,
  lightNovel: selectLightNovel,
  isCrudNovelLoading: selectIsCrudNovelLoading,
  isCrudNovelSuccess: selectIsCrudNovelSuccess,
  error: selectError
});

const mapDispatchToProps = dispatch => ({
  updateNovelStart: (lightNovelId, novel) =>
    dispatch(updateNovelStart({ lightNovelId, novel })),
  crudNovelStatusReset: () => dispatch(crudNovelStatusReset())
});

UpdateNovel.whyDidYouRender = {
  //logOnDifferentValues: true
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNovel);
