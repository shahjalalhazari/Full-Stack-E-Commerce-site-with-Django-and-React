// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProductDetails from './pages/ProductDetails';
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import Cart from "./pages/Cart.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ShippingAddressPage from "./pages/ShippingAddressPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart/:id?",
        element: <Cart />,
      },
      {
        path: "shipping-address",
        element: <ShippingAddressPage />,
      },
      // user related pages
      {
        path: "user/login",
        element: <LoginPage />,
      },
      {
        path: "user/register",
        element: <RegisterPage />,
      },
      {
        path: "user/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // <React.StrictMode>
  //   <RouterProvider router={router} />
  // </React.StrictMode>,
);
