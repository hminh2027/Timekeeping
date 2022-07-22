import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const { isShowing, hide, children, closeButton } = props;

  const content = isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className="modal-overlay "
            style={{
              position: "fixed",
              top: 0,
              width: "100vw",
              height: "100vh",
            }}
            onClick={
              closeButton
                ? (e) => {
                    e.preventDefault();
                  }
                : () => hide()
            }
          >
            <div
              className="absolute justify-center w-screen h-screen rounded-none card space bg-mirror"
              onClick={
                closeButton
                  ? (e) => {
                      e.preventDefault();
                    }
                  : () => hide()
              }
              style={{
                // backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
              }}
            >
              <div
                className="items-center justify-center flex-grow-0 card-body"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <div>{children}</div>
                  {closeButton && (
                    <div
                      className="absolute top-1 right-1 p-2 text-3xl rounded cursor-pointer"
                      onClick={() => hide()}
                    >
                      ✖
                    </div>
                  )}
                </div>
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
