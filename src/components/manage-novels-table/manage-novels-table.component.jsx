import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import moment from "moment";

import { selectNovels } from "../../redux/novel/novel.selectors";

const ManageNovelsTable = ({ novels }) => {
  const location = useLocation();

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped table-bordered table-sm text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Update/Delete</th>
            <th scope="col">LightNovelId</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Sold</th>
            <th scope="col">Create Date Time</th>
            <th scope="col">Update Date Time</th>
          </tr>
        </thead>
        <tbody>
          {novels.map(novel => (
            <tr key={novel.lightNovelId}>
              <td>
                <Link to={location.pathname + "/" + novel.lightNovelId}>
                  Edit
                </Link>
              </td>
              <td>{novel.lightNovelId}</td>
              <td>{novel.title}</td>
              <td>${novel.price}</td>
              <td>{novel.quantity}</td>
              <td>{novel.sold}</td>
              <td>
                {moment(novel.createDateTime).format("MMMM Do YYYY, h:mm:ss a")}
              </td>
              <td>
                {moment(novel.updateDateTime).format("MMMM Do YYYY, h:mm:ss a")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  novels: selectNovels
});

export default connect(mapStateToProps)(ManageNovelsTable);
