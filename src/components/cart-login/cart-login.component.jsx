import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const CartLogin = ({ disabled = false }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <button
        data-toggle="modal"
        data-target="#cartLoginModal"
        className="btn btn-success btn-block"
        disabled={disabled}
      >
        <i className="fa fa-shopping-basket"></i> Checkout
      </button>
      {/* Modal */}
      <div className="modal fade" id="cartLoginModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body text-wrap text-break">
              <h6>Please login to continue.</h6>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button
                className="btn btn-info"
                onClick={() => history.replace("/login", { from: location })}
                data-dismiss="modal"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartLogin;
