import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import LoadingOverlay from "react-loading-overlay";

import {
  selectError,
  selectSignUpSuccessMessage
} from "../../redux/user/user.selectors";
import { signUpStart } from "../../redux/user/user.actions";
import Spinner from "../../components/spinner/spinner.component";

import "./registerpage.styles.scss";

const RegisterPage = ({ error, signUpStart, signUpSuccessMessage }) => {
  const [userCredentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let errorObject = {};
    if (error) {
      errorObject = error.errors.reduce((acc, cv) => {
        acc[Object.keys(cv)[0]] = cv[Object.keys(cv)[0]];
        return acc;
      }, {});
    }

    setErrors(errorObject);
  }, [error]);

  useEffect(() => {
    setIsLoading(false);
  }, [error, signUpSuccessMessage]);

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return;
    }

    setIsLoading(true);
    signUpStart(firstName, lastName, email, password);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="container my-5 pb-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          {signUpSuccessMessage ? (
            <div className="alert alert-success">{signUpSuccessMessage}</div>
          ) : null}
          <LoadingOverlay active={isLoading} spinner={<Spinner />}>
            <div className="card border-secondary card-body bg-light mt-5 mb-5">
              <h2 className="text-dark">Create an Account</h2>
              <p>Please fill out this form to register with us</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name: <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    value={firstName}
                    onChange={handleChange}
                    required
                    disabled={signUpSuccessMessage}
                  />
                  <span className="invalid-feedback">{errors.firstName}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">
                    Last Name: <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    value={lastName}
                    onChange={handleChange}
                    required
                    disabled={signUpSuccessMessage}
                  />
                  <span className="invalid-feedback">{errors.lastName}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Email: <sup>*</sup>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      errors.email || errors.error ? "is-invalid" : ""
                    }`}
                    value={email}
                    onChange={handleChange}
                    required
                    disabled={signUpSuccessMessage}
                  />
                  <span className="invalid-feedback">
                    {errors.email || errors.error}
                  </span>
                </div>
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
                    disabled={signUpSuccessMessage}
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
                    disabled={signUpSuccessMessage}
                  />
                  <span className="invalid-feedback">
                    {errors.confirmPassword}
                  </span>
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-success btn-block"
                      disabled={signUpSuccessMessage}
                    />
                  </div>
                  <div className="col">
                    <Link className="btn btn-light btn-block" to="/login">
                      Have an account? Login
                    </Link>
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
  error: selectError,
  signUpSuccessMessage: selectSignUpSuccessMessage
});

const mapDispatchToProps = dispatch => ({
  signUpStart: (firstName, lastName, email, password) =>
    dispatch(signUpStart({ firstName, lastName, email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
