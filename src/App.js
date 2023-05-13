import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";

// import Pages
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AllFood from "./pages/AllFood/AllFood";
import Detail from "./pages/DetailFood/DetailFood";
import Favorite from "./pages/Favorite/Favorite";
import AddFood from "./pages/AddFood/AddFood";
import Profile from "./pages/Profile/Profile";
import AllUsers from "./pages/AllUsers/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
        <Contact />
        <Footer />
      </>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allfood",
        element: <AllFood />,
      },
      {
        path: "/detail/:foodID",
        element: <Detail />,
      },
      {
        path: "/favorite",
        element: localStorage.getItem("token") ? <Favorite /> : <Error />,
      },
      {
        path: "/add-food",
        element:
          localStorage.getItem("role") === "admin" ? <AddFood /> : <Error />,
      },
      {
        path: "/profile",
        element: localStorage.getItem("token") ? <Profile /> : <Error />,
      },
      {
        path: "/all-users",
        element:
          localStorage.getItem("role") === "admin" ? <AllUsers /> : <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
