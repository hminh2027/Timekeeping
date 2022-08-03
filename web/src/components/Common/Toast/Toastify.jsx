import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "font-bold",
  theme: "colored",
};

export const notify = (content, type) => {
  switch (type) {
    case "success":
      toast.success(content, config);
      break;
    case "warning":
      toast.warn(content, config);
      break;
    case "error":
      toast.error(content, config);
      break;
  }
};
