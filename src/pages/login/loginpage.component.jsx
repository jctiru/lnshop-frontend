import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import LoadingOverlay from "react-loading-overlay";

import { selectError } from "../../redux/user/user.selectors";
import { signInStart, resetError } from "../../redux/user/user.actions";
import Spinner from "../../components/spinner/spinner.component";

const LoginPage = ({ error, signInStart, resetError, location }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    resetError();
  }, [resetError]);

  useEffect(() => {
    setIsLoading(false);
  }, [error]);

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    signInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="container my-5 pb-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          {error ? (
            <div className="alert alert-danger">
              {error.status === 401
                ? "Wrong credentials."
                : "Please check your email for email verification."}
            </div>
          ) : null}
          <LoadingOverlay active={isLoading} spinner={<Spinner />}>
            <div className="card border-secondary card-body bg-light mt-5 mb-5">
              <h2 className="text-dark">Login</h2>
              <p>Please fill in your credentials to log in</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">
                    Email: <sup>*</sup>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                  <span className="invalid-feedback">EMAIL ERROR</span>
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    Password: <sup>*</sup>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                  <span className="invalid-feedback">PASSWORD ERROR</span>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <Link to="/login/password-reset-request">
                      <u>Forgot password?</u>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      type="submit"
                      value="Login"
                      className="btn btn-success btn-block"
                    />
                  </div>
                  <div className="col">
                    <Link className="btn btn-light btn-block" to="/register">
                      No account? Register
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
});

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart({ email, password })),
  resetError: () => dispatch(resetError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
