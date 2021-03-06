import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import queryString from "query-string";
import LoadingOverlay from "react-loading-overlay";

import {
  selectSuccessMessage,
  selectError
} from "../../redux/user/user.selectors";
import {
  emailVerificationStart,
  crudUserStatusReset
} from "../../redux/user/user.actions";

const EmailVerificationPage = ({
  successMessage,
  error,
  emailVerificationStart,
  crudUserStatusReset
}) => {
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
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
    if (!initialRender.current) {
      return;
    }

    const queryStringObj = queryString.parse(location.search);

    if (typeof queryStringObj.token !== "undefined") {
      emailVerificationStart(queryStringObj.token);
      setIsLoading(true);
    } else {
      setMessage("Your email confirmation request couldn't be processed.");
    }
  }, [emailVerificationStart, location.search]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (successMessage !== null) {
      setMessage("Email successfully validated! You can now login!");
    } else if (error !== null) {
      setMessage("Email verification link expired or not valid");
    }

    setIsLoading(false);
  }, [successMessage, error]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div className="card border-secondary my-5">
            <div className="card-header">
              <h5 className="mb-0 text-center">Email Verification</h5>
            </div>
            <LoadingOverlay active={isLoading}>
              <div className="card-body">{message}</div>
            </LoadingOverlay>
          </div>
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
  emailVerificationStart: emailVerificationToken =>
    dispatch(emailVerificationStart({ emailVerificationToken })),
  crudUserStatusReset: () => dispatch(crudUserStatusReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailVerificationPage);
