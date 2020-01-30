import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { signInStart } from "../../redux/user/user.actions";

import "./loginpage.styles.scss";

const LoginPage = ({ signInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    signInStart(email, password);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="container my-5 pb-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
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
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signInStart: (email, password) => dispatch(signInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(LoginPage);
