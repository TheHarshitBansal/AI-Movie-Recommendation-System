import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
const App = lazy(() => import("./App.jsx"));
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { BlinkBlur } from "react-loading-indicators";

createRoot(document.getElementById("root")).render(
  <div className="font-manrope bg-black8">
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <BlinkBlur
            color="#FF0000"
            size="medium"
            text="Loading !"
            textColor="#141414"
          />
        </div>
      }
    >
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate
            persistor={persistor}
            loading={
              <div className="w-screen h-screen flex items-center justify-center">
                <BlinkBlur
                  color="#FF0000"
                  size="medium"
                  text="Loading !"
                  textColor="#141414"
                />
              </div>
            }
          >
            <App />
          </PersistGate>
          <ToastContainer position="bottom-left" autoClose={5000} stacked />
        </Provider>
      </BrowserRouter>
    </Suspense>
  </div>
);
