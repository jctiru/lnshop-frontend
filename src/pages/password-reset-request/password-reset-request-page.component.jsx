import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import LoadingOverlay from "react-loading-overlay";

import {
  selectSuccessMessage,
  selectError
} from "../../redux/user/user.selectors";
import {
  passwordResetRequestStart,
  crudUserStatusReset
} from "../../redux/user/user.actions";

const PasswordResetRequestPage = ({
  successMessage,
  error,
  passwordResetRequestStart,
  crudUserStatusReset
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      return;
    }

    if (successMessage || error) {
      crudUserStatusReset();
    }
  }, [successMessage, error, crudUserStatusReset]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (successMessage !== null || error !== null) {
      setIsLoading(false);

      if (successMessage !== null) {
        setDisabled(true);
      }
    }
  }, [successMessage, error]);

  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);
    passwordResetRequestStart(email);
  };

  const handleChange = event => {
    setEmail(event.target.value);
  };

  return (
    <div className="container my-5 pb-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          {error ? (
            <div className="alert alert-danger">Email not found.</div>
          ) : null}
          {successMessage ? (
            <div className="alert alert-success">
              Please check your email for password reset link.
            </div>
          ) : null}
          <LoadingOverlay active={isLoading}>
            <div className="card border-secondary card-body bg-light mt-5 mb-5">
              <h2 className="text-dark">Password Reset</h2>
              <p>Please enter your email address below:</p>
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
                    disabled={disabled}
                  />
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
  passwordResetRequestStart: email =>
    dispatch(passwordResetRequestStart({ email })),
  crudUserStatusReset: () => dispatch(crudUserStatusReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetRequestPage);
