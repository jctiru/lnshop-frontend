import React from "react";
import { Link } from "react-router-dom";

const NovelCard = ({ novel }) => (
  <div className="col-lg-3 col-md-6 col-12 mt-3 mb-3 d-flex">
    <div className="card border-secondary mb-xs-5 mt-xs-5">
      <Link to={`novels/show/${novel.lightNovelId}`}>
        <img
          className="card-img-top"
          src={novel.imageUrl}
          alt={novel.imageUrl}
        />
      </Link>
      <div className="card-body">
        <h4 className="card-title">
          <strong>
            <Link to={`novels/show/${novel.lightNovelId}`}>{novel.title}</Link>
          </strong>
        </h4>
        <h6 className="card-subtitle mb-3 text-muted">
          {novel.genres.map(genre => genre.name + " ")}
        </h6>
      </div>
      <div className="card-footer text-dark">Price: {novel.price}</div>
    </div>
  </div>
);

export default NovelCard;
