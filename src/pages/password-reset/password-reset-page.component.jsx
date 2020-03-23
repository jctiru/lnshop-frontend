import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import queryString from "query-string";
import LoadingOverlay from "react-loading-overlay";

import {
  selectSuccessMessage,
  selectError
} from "../../redux/user/user.selectors";
import {
  passwordResetStart,
  crudUserStatusReset
} from "../../redux/user/user.actions";
import Spinner from "../../components/spinner/spinner.component";

const PasswordResetPage = ({
  successMessage,
  error,
  passwordResetStart,
  crudUserStatusReset
}) => {
  const [passwordCredentals, setPasswordCredentials] = useState({
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const initialRender = useRef(true);
  const { password, confirmPassword } = passwordCredentals;

  useEffect(() => {
    if (!initialRender.current) {
      return;
    }

    if (successMessage || error) {
      crudUserStatusReset();
    }
  }, [successMessage, error, crudUserStatusReset]);

  // Redirect to homepage if url doesn't contain token
  useEffect(() => {
    if (!initialRender.current) {
      return;
    }

    const queryStringObj = queryString.parse(location.search);

    if (typeof queryStringObj.token === "undefined" || !queryStringObj.token) {
      history.replace("/");
    }
  }, [location.search, history]);

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
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (successMessage !== null || error !== null) {
      setIsLoading(false);

      console.log(error);
      if (
        successMessage !== null ||
        (typeof error.errors !== "undefined" &&
          typeof error.errors[0].error !== "undefined") ||
        (typeof error.operationResult !== "undefined" &&
          error.operationResult === "ERROR")
      ) {
        setDisabled(true);
      }
    }
  }, [successMessage, error]);

  const handleSubmit = event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return;
    }

    const queryStringObj = queryString.parse(location.search);

    setIsLoading(true);
    passwordResetStart(queryStringObj.token, password);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setPasswordCredentials({ ...passwordCredentals, [name]: value });
  };

  return (
    <div className="container my-5 pb-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          {error ? (
            <div className="alert alert-danger">
              {typeof error.errors !== "undefined" &&
              typeof error.errors[0].password !== "undefined"
                ? "Cannot process request."
                : "Cannot process request. Token expired or invalid."}
            </div>
          ) : null}
          {successMessage ? (
            <div className="alert alert-success">
              Password reset successful.
            </div>
          ) : null}
          <LoadingOverlay active={isLoading} spinner={<Spinner />}>
            <div className="card border-secondary card-body bg-light mt-5 mb-5">
              <h2 className="text-dark">Reset Password</h2>
              <p>Please fill out form below to reset password.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="password">
                    Password: <sup>*</sup>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    value={password}
                    onChange={handleChange}
                    required
                    disabled={disabled}
                  />
                  <span className="invalid-feedback">{errors.password}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    Confirm Password: <sup>*</sup>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={disabled}
                  />
                  <span className="invalid-feedback">
                    {errors.confirmPassword}
                  </span>
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      type="submit"
                      value="Send"
                      className="btn btn-success btn-block"
                      disabled={disabled}
                    />
                  </div>
                </div>
              </form>
            </div>
          </LoadingOverlay>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  successMessage: selectSuccessMessage,
  error: selectError
});

const mapDispatchToProps = dispatch => ({
  passwordResetStart: (token, password) =>
    dispatch(passwordResetStart({ token, password })),
  crudUserStatusReset: () => dispatch(crudUserStatusReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage);
