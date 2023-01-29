import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import store from "./stores"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Register from "./pages/Register"
import UserList from "./pages/UserList"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Register />,
      },
      {
        path: "user-list",
        element: <UserList />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
