import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashbord from "./components/layouts/Dashboard/dashboard";
import Dashboard from "/src/pages/Dashboard/dashboard";
import Orders from "/src/pages/Orders/orders";
import Products from "/src/pages/Products/products";
import Other from "/src/pages/Other/other";
import Login from './pages/login/login';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashbord />,
      children: [
    
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/other",
          element: <Other />,
        },
      ],
      
    },
        {
          path: "/login",
          index: true,
          element: <Login />,
        },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
