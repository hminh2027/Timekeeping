import React from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";
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
              zIndex: 20,
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
              className="space card absolute h-screen w-screen justify-center rounded-none bg-mirror"
              onClick={
                closeButton
                  ? (e) => {
                      e.preventDefault();
                    }
                  : () => hide()
              }
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                justifyContent: "center",
              }}
            >
              <div
                className="card-body flex-grow-0 items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <div>{children}</div>
                  {closeButton && (
                    <div
                      className="absolute top-1 right-1 cursor-pointer rounded p-2 text-3xl"
                      onClick={() => hide()}
                    >
                      <IoClose />
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
