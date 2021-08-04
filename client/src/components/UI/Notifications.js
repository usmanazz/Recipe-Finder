import { toast } from "react-toastify";

// render toastify notifications
const notifications = {
  success(message, time) {
    toast.success(message, {
      position: "top-right",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  },

  error(message, time) {
    toast.error(message, {
      position: "top-right",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  },
};

export default notifications;
