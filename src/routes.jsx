import {
  HomeIcon,
  CalculatorIcon,
  CalendarIcon,
  UserIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";
// import { Home, Profile, Tables, Notifications } from "@/pages/inicio";
import RutaProtegida from "@/layouts/RutaProtegida";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "inicio",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Inicio",
        path: "/",
        element: <RutaProtegida />,
      },
    ],
  },
  {
    layout: "clientes",
    pages: [
      {
        icon: <UserIcon {...icon} />,
        name: "Clientes",
        path: "/",
        element: <RutaProtegida />,
      },
    ],
  },
  {
    layout: "proveedores",
    pages: [
      {
        icon: <BanknotesIcon {...icon} />,
        name: "Proveedores",
        path: "/",
        element: <RutaProtegida />,
      },
    ],
  },
  {
    layout: "contable",
    pages: [
      {
        icon: <CalculatorIcon {...icon} />,
        name: "Contable",
        path: "/",
        element: <RutaProtegida />,
      },
    ],
  },
  {
    layout: "salas",
    pages: [
      {
        icon: <CalendarIcon {...icon} />,
        name: "Salas",
        path: "/",
        element: <RutaProtegida />,
      },
    ],
  },
];

export default routes;
