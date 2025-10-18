export const BASE_URL = `https://smitbe.vercel.app/api`;
//export const BASE_URL = `http://localhost:7700/api`;


import { Bounce, toast } from "react-toastify";

// obj = {type , message}
export const ToastAlert = (obj) => {
    console.log(obj)
    switch (obj.type) {

        case "success":
            return toast.success(obj.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        case "error":
            return toast.error(obj.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
    }
}