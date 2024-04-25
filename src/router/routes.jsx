import Login from "../pages/Login";
import Home from "../pages/Home";
import {
  CategoryController,
  MaterialController,
  MaterialTranzaction,
  MaterialTypeController,
  UserController,
  ItemController,
  ItemTranzaction,
  ItemTypeController,
  MatCatController,
  IdItem,
} from "../pages";

const token = sessionStorage.getItem("token");

export const routes = [
  {
    key: 0,
    path: "/",
    label: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <Home /> : <Login />,
    hidden: false,
  },
  {
    key: 1,
    path: "/category-controller",
    label: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <CategoryController /> : <Login />,
    hidden: false,
  },

  {
    key: 2,
    path: "/material-controller",
    label: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <MaterialController /> : <Login />,
    hidden: false,
  },

  {
    key: 3,
    path: "/material-tranzaction",
    label: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <MaterialTranzaction /> : <Login />,
    hidden: false,
  },

  {
    key: 4,
    path: "/material-type-controller",
    label: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <MaterialTypeController /> : <Login />,
    hidden: false,
  },

  {
    key: 5,
    path: "/user-controller",
    label: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <UserController /> : <Login />,
    hidden: false,
  },

  {
    key: 6,
    path: "/item-controller",
    label: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <ItemController /> : <Login />,
    hidden: false,
  },

  {
    key: 7,
    path: "/item-tranzaction",
    label: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <ItemTranzaction /> : <Login />,
    hidden: false,
  },

  {
    key: 8,
    path: "/item-type-controller",
    label: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <ItemTypeController /> : <Login />,
    hidden: false,
  },

  {
    key: 9,
    path: "/mat-cat-controller",
    label: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <MatCatController /> : <Login />,
    hidden: false,
  },
];

export const hiddenroutes = [
  {
    key: 100,
    path: "/item-controller/:id",
    element: token ? <IdItem /> : <Login />,
  },
];
