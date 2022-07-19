import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const { isShowing, hide, children } = props;

  const content = isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className="modal-overlay            "
            style={{
              position: "fixed",
              top: 0,
              width: "100vw",
              height: "100vh",
            }}
            onClick={() => hide()}
          >
            <div
              className="card absolute w-screen h-screen space justify-center bg-mirror rounded-none"
              onClick={() => hide()}
              style={{
                // backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
              }}
            >
              <div
                className="card-body items-center justify-center flex-grow-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div>{children}</div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.querySelector("div#__next")
      )
    : null;
  return content;
};

export default Modal;
