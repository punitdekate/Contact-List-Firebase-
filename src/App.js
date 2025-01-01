import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
