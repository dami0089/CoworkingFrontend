import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  CalculatorIcon,
  CalendarIcon,
  InboxIcon,
  UserIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";
// import { Home, Profile, Tables, Notifications } from "@/pages/inicio";
import { SignIn, SignUp } from "@/pages/auth";
import RutaProtegida from "@/layouts/RutaProtegida";
import Crm from "@/pages/inicio/crm";
import { Clientes } from "@/pages/inicio/clientes";
import Proveedores from "@/pages/inicio/proveedores";
import Contable from "@/pages/inicio/contable";
import Salas from "@/pages/inicio/salas";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "inicio",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "inicio",
        path: "/",
        element: <RutaProtegida />,
      },
      // {
      //   icon: <InboxIcon {...icon} />,
      //   name: "CRM",
      //   path: "/crm",
      //   element: <Crm />,
      // },
      {
        icon: <UserIcon {...icon} />,
        name: "Clientes",
        path: "/clientes",
        element: <Clientes />,
      },
      {
        icon: <BanknotesIcon {...icon} />,
        name: "Proveedores",
        path: "/proveedores",
        element: <Proveedores />,
      },
      {
        icon: <CalculatorIcon {...icon} />,
        name: "Contable",
        path: "/contable",
        element: <Contable />,
      },
      {
        icon: <CalendarIcon {...icon} />,
        name: "Salas",
        path: "/salas",
        element: <Salas />,
      },
    ],
  },
];

export default routes;
