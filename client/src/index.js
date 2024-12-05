import { Provider } from "react-redux";
import { App } from "./components/App";
import { store } from "./redux/store";
import ReactDOM from "react-dom/client";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <App />
  </Provider>
);
