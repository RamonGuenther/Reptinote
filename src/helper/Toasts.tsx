import {toast} from "react-toastify";

export const notifySuccess = (str: String) => toast.success(str, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
});

export const notifyFailure = (str : String) => toast.error(str, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    progress: undefined,
});


