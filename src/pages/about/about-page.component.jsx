import React from "react";

import "./about-page.styles.scss";

const AboutPage = () => (
  <>
    {/* Jumbotron */}
    <div className="container">
      <div
        id="pages-about-jumbotron"
        className="jumbotron text-center py-4 mb-3"
      >
        <h1 className="text-white jumbotron-text-shadow">About</h1>
      </div>
    </div>
    <div className="container pt-2 pb-5 mb-5">
      <div className="row">
        <div className="col-md-6 mb-3">
          <img src="/img/download-min.jpg" className="w-100" alt="" />
        </div>
        <div className="col-md-6">
          <div className="card border-dark">
            <div className="card-body">
              <h2 className="card-title text-dark">About and Disclaimer</h2>
              <div className="card-text text-dark">
                <p>
                  This simple website/project is created as a practice/excercise
                  for full-stack WebDev and solely for educational purposes.
                  Almost all resources used are from the internet. The project's
                  main theme is Light Novel Book Store eCommerce{" "}
                  <strong>
                    <em>but some sections may or may not</em>
                  </strong>{" "}
                  adhere to the whole theme.
                </p>
                <p>
                  <strong>
                    <em>
                      Disclaimer: No copyright infringement is intended. This is
                      only for educational purposes and not for profit. Most
                      asset/s used are not owned by the developer/s unless
                      otherwise stated; the credit goes to the owner/s.
                    </em>
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default AboutPage;
