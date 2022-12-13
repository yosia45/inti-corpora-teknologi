// import "./App.css";
import { Provider } from "react-redux";
import store from "./store/index";
import { RouterProvider } from "react-router-dom";
import router from "./router/index";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
