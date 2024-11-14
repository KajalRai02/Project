import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import CircularSpinner from "./components/Forms/CircularSpinner.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <PersistGate loading={<CircularSpinner />} persistor={persistor}>
        <App />
      </PersistGate>
    </StrictMode>
    ,
  </Provider>
);
