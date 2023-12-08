import { toast } from "react-toastify";

export default function ToastifyShow(x:any, toastifyType: any = "info") {
  toast.success(x, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    type: toastifyType ? toastifyType : "info",
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: 0,
  });
}
