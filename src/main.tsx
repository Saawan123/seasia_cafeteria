
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import FullScreenLoader from "./components/FullScreenLoader";
// import ErrorBoundary from "./components/atoms/ErrorBoundary";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Suspense fallback={<FullScreenLoader/>}>
    <Provider store={store}>
      <BrowserRouter basename="/">
        {/* <ErrorBoundary > */}
          <App />
        {/* </ErrorBoundary> */}
      </BrowserRouter>
    </Provider>
    </Suspense>
  // </React.StrictMode>
);
