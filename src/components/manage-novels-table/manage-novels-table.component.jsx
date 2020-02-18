import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import moment from "moment";

import { selectNovels } from "../../redux/novel/novel.selectors";
import { deleteNovelStart } from "../../redux/novel/novel.actions";

const ManageNovelsTable = ({ novels, deleteNovelStart }) => {
  const [novelIdAndTitle, setNovelIdAndTitle] = useState({
    novelId: null,
    novelTitle: null
  });
  const location = useLocation();

  const handleModalOpen = e => {
    setNovelIdAndTitle({
      novelId: e.target.getAttribute("data-novel-id"),
      novelTitle: e.target.getAttribute("data-novel-title")
    });
  };

  const handleDeleteClick = () => {
    deleteNovelStart(novelIdAndTitle.novelId);
  };

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
                <Link
                  className="btn btn-link p-0"
                  to={location.pathname + "/" + novel.lightNovelId}
                >
                  Edit
                </Link>
                /
                <button
                  data-novel-id={novel.lightNovelId}
                  data-novel-title={novel.title}
                  data-toggle="modal"
                  data-target="#deleteModal"
                  className="btn btn-link p-0"
                  onClick={handleModalOpen}
                >
                  Delete
                </button>
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
      {/* Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Novel</h5>
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body text-wrap text-break">
              <h6>Are you sure you want to delete this novel?</h6>
              <br />
              <br />
              Novel Id:
              <br />
              {novelIdAndTitle.novelId}
              <br />
              <br />
              Novel Title:
              <br />
              {novelIdAndTitle.novelTitle}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteClick}
                data-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  novels: selectNovels
});

const mapDispatchToProps = dispatch => ({
  deleteNovelStart: lightNovelId => dispatch(deleteNovelStart({ lightNovelId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageNovelsTable);
