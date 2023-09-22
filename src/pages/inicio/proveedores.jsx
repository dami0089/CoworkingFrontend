import { React } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  ArrowLeftIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  CheckBadgeIcon,
  ClockIcon,
  PlusCircleIcon,
  QueueListIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

import useProveedores from "@/hooks/useProveedores";

import Profile from "@/components/clientes/Profile";
import ModalNuevoProveedor from "@/components/proveedores/ModalNuevoProveedor";
// import ModalCargarFactura from "@/components/ModalCargarFacturaProveedor";
import ListadoDeProveedores from "@/components/proveedores/ListadodeProveedores";
import PagadoEnElMes from "@/components/contable/PagadoEnElMes";
import ListadoDeRubros from "@/components/ListadoDeRubros";
import ModalNuevoRubro from "@/components/proveedores/ModalNuevoRubro";
import ModalNuevoMovimiento from "@/components/proveedores/ModalNuevoMovimiento";
import ListadodeFacturasAPagar from "@/components/proveedores/ListadodeFacturasAPagar";
import ModalNuevoPago from "@/components/proveedores/ModalNuevoPago";
import { ToastContainer } from "react-toastify";

export function Proveedores() {
  const {
    handleModalNuevoProveedor,
    handleModalNuevoRubro,
    handleModalCargarFactura,

    modalNuevoProveedor,
    modalNuevoRubro,
    modalNuevoMovimiento,
    modalNuevoPago,
    selectProveedores,
    setSelectProveedores,
  } = useProveedores();

  const handleClick = () => {
    // handleModalNuevoPlan();
    setSeleccion(5);
  };

  const handleProveedor = () => {
    handleModalNuevoProveedor();
  };

  return (
    <>
      {selectProveedores === 1 ? (
        <>
          <div className="mt-20 flex flex-wrap justify-between">
            <ToastContainer pauseOnFocusLoss={false} />

            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={handleProveedor}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <UserPlusIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Nuevo Proveedor
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              // onClick={(e) => handlePlanesActivos()}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <CheckBadgeIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Cargar Factura
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => setSelectProveedores(3)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <ClockIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Pagos Pendientes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>

          <div className="mt-10 flex flex-wrap justify-between">
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={() => setSelectProveedores(2)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <UserPlusIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Listado de Proveedores
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : selectProveedores == 2 ? (
        <ListadoDeProveedores />
      ) : (
        ""
      )}

      {modalNuevoProveedor ? <ModalNuevoProveedor /> : ""}
      {modalNuevoRubro ? <ModalNuevoRubro /> : ""}
      {modalNuevoMovimiento ? <ModalNuevoMovimiento /> : ""}
      {modalNuevoPago ? <ModalNuevoPago /> : ""}
    </>
  );
}

export default Proveedores;