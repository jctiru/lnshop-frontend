import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pt-0 bg-dark text-white">
      <div className="container">
        <div className="row pt-5 mb-3 text-center d-flex justify-content-center">
          <div className="col-md-2 mb-3">
            <h6 className="title font-bold">
              <Link className="text-white" to="/">
                Home
              </Link>
            </h6>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="title font-bold">
              <Link className="text-white" to="/novels">
                Novels
              </Link>
            </h6>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="title font-bold">
              <Link className="text-white" to="/about">
                About
              </Link>
            </h6>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="title font-bold">
              <Link className="text-white" to="/cart">
                Cart
              </Link>
            </h6>
          </div>
        </div>
        <hr style={{ margin: "0 15%", borderColor: "inherit" }} />
        <div className="row d-flex text-center justify-content-center mb-md-0">
          <div className="col-md-8 col-12 mt-4">
            <blockquote
              style={{ lineHeight: "1.7rem" }}
              className="blockquote text-center"
            >
              <p className="mb-0">
                You know you’ve read a good book when you turn the last page and
                feel a little as if you have lost a friend.
              </p>
              <div className="blockquote-footer">Paul Sweeney</div>
            </blockquote>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-12">
            <div className="mb-2 text-center">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/jctiru"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook fa-lg white-text mr-4"> </i>
              </a>
              {/* Linkedin */}
              <a
                href="https://www.linkedin.com/in/jctiru/"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-linkedin fa-lg white-text mx-4"> </i>
              </a>
              {/* Github */}
              <a
                href="https://github.com/jctiru/lnshop-frontend"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-github fa-lg white-text mx-4"> </i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-fluid text-center pb-3">
          © 2020 Copyright:{" "}
          <a className="text-white" href="<?php echo URLROOT ?>">
            {" "}
            LNShop{" "}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
