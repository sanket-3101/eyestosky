import React from "react";


function Modal({ isOpen, onClose } : any) {
  if (!isOpen) return null;

  return (
    <div className="modal fade modal-getotp show modal-backdrop"  aria-labelledby="getotpModalLabel" aria-hidden="true" style={{ display: "block", opacity: '0.8', background: '#000' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center">
            <span className="success-true">
              <i className="bx bx-check font-weight-bold"></i>
            </span>
            <h5 className="modal-title text-center mt-0 font-weight-semibold">We have shared the password reset link on your registered email address</h5>
            <div className="buttons text-center mt-4">
              <button className="btn btn-primary" onClick={onClose} aria-label="Close">Okay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
