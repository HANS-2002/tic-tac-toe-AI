import React from "react";
import ReactDOM from "react-dom/client";

import MainMenu from "./components/MainMenu";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MultiplayerOnline from "./components/MultiplayerOnline";
import AIGame from "./components/AIGame";
import MultiplayerOffline from "./components/MultiplayerOffline";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <Navbar />
      <Outlet />
      <Footer />
      </div>
      
    </>
  );
};

const routes = [
  {
    path: "/",
    element: <MainMenu />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/multiplayerOnline",
    element: <MultiplayerOnline />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/singlePlayer",
    element: <AIGame />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/multiplayerOffline",
    element: <MultiplayerOffline />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
    errorElement: <Navigate to="/" />,
  },
];

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routes,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
