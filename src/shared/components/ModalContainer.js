import React from "react";

function ModalContainer({ title, children }) {
  return (
    <div className="modalWrapper">
      <div className="modalBody">
        <div className="modalTitle">{title}</div>
        <div className="modalContent">{children}</div>
      </div>
    </div>
  );
}

export default ModalContainer;
