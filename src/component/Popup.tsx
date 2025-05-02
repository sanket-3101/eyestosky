import React from "react";
function Popup({ closeModal, description }: any) {
  return (
    <div>
      <div className="description-modal">
        <div className="description-modal-content ">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="description-text-container ">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
