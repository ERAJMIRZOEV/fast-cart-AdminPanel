import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashbord from "./components/layouts/Dashboard/dashboard";
import Dashboard from "/src/pages/Dashboard/dashboard";
import Orders from "/src/pages/Orders/orders";
import Products from "/src/pages/Products/products";
import Other from "/src/pages/Other/other";
import Login from './pages/login/login';
import AddProduct from "./pages/addProduct/addProduct";
import Brands from "./pages/other/otherBrands";
import BrandsOtherSubCategory from "./pages/other/otherSubCategory";
import EditProduct from "./pages/editProducts/editProducts";
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
          path: "/addProduct",
          element: <AddProduct/>
        },
        {
          path: "/other",
          element: <Other />,
        },
        {
          path: "/other",
          element: <Other />,
        },
        {
          path: "/brands",
          element: <Brands />,
        },
        {
          path: "/subcategories",
          element: <BrandsOtherSubCategory />,
        },
        {
          path: "/editproduct",
          element: <EditProduct/> 
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
