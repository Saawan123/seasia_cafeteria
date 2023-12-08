
import { ToastContainer } from "react-toastify";
import RouteFile from "./routes/routes";

function App() {
  return (
    <>
   <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <RouteFile />
    </>
  );
}

export default App;
