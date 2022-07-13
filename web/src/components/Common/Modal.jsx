import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
const Modal = (props) => {
  const { isShowing, hide, children } = props;
  const handleClick = (event) => {
    // event.stopPropagation();
    console.log(event);
  };
  const content = isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className="modal-overlay"
            style={{
              position: "fixed",
              top: 0,
              width: "100vw",
              height: "100vh",
            }}
            onClick={() => hide()}
          >
            <div
              className="modal-wrapper"
              aria-modal
              aria-hidden
              tabIndex={-1}
              role="dialog"
              style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",

                backgroundColor: "rgba(0,0,0,0.5)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card onClick={(e) => e.stopPropagation()}>
                <div className="modal-header" style={{ textAlign: "right" }}>
                  <span
                    aria-hidden="true"
                    onClick={() => hide()}
                    className="modal-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                    style={{ fontSize: "2em", cursor: "pointer" }}
                  >
                    &times;
                  </span>
                </div>
                <div>{children}</div>
              </Card>
            </div>
          </div>
        </React.Fragment>,
        document.querySelector("div#__next")
      )
    : null;
  return content;
};

export default Modal;
