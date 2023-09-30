import { React, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Menu,
  Button,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  BanknotesIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentPlusIcon,
  FingerPrintIcon,
  HandThumbDownIcon,
  PlusCircleIcon,
  QueueListIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";

import ModalNuevoCliente from "@/components/clientes/ModalNuevoCliente";
import ModalNuevoCliente2 from "@/components/clientes/ModalNuevoCliente2";
import useClientes from "@/hooks/useClientes";
import ModalResumen from "@/components/clientes/ModalResumen";
import ListadodeClientes from "../../components/clientes/ListadodeClientes";
import ListadoUsuarios from "../../components/clientes/ListadoUsuarios";
import Planes from "@/components/clientes/Planes";
import ModalNuevoPlan from "@/components/clientes/ModalNuevoPlan";
import Profile from "@/components/clientes/Profile";

import EditarCliente from "@/components/clientes/EditarCliente";
import ModalModificarPlan from "@/components/clientes/ModalModificarPlan";
import ListadodeClientesInactivos from "@/components/clientes/ListadodeClientesInactivos";
import ListadodeProximosVencimientos from "@/components/clientes/ListadodeProximosVencimientos";
import ListadodeAsistencias from "@/components/clientes/ListadodeAsistencias";
import ListadoAsistenciasProfile from "@/components/clientes/ListadoAsistenciasProfile";
import ModalEditarAsistencia from "@/components/clientes/ModalEditarAsistencia";
import ModalEditarUsuario from "@/components/clientes/ModalEditarUsuario";
import ModalEliminarUsuario from "@/components/clientes/ModalEliminarUsuario";
import QrScanner from "@/components/clientes/RegistrarClientes";
import RegistrarClientes from "@/components/clientes/RegistrarClientes";

export function Clientes() {
  const {
    handleModalNuevoCliente,
    seleccion,
    setSeleccion,
    handleModalNuevoPlan,
    nombreProfileAsistencia,
    planprofileAsistencias,
    resetAsistencias,
    asistioHoyProfileAsistencias,
    setActualizoListado,
    obtenerUsuarios,
    modalEditarAsistencia,
    actualizoListado,
    modalNuevoCliente,
    modalNuevoCliente2,
    modalResumen,
    modalNuevoPlan,
    modalEditarCliente,
    modalModificarPlan,
    modalEditarUsuario,
    modalEliminarUsuario,
  } = useClientes();

  const handleClick = () => {
    handleModalNuevoPlan();
    // setSeleccion(5);
  };

  useEffect(() => {
    const obtenerUsers = async () => {
      if (actualizoListado) {
        await obtenerUsuarios();
        setActualizoListado(false);
      }
    };
    obtenerUsers();
  }, [actualizoListado]);

  const handlePlanesActivos = () => {
    setSeleccion(2);
  };

  return (
    <>
      {seleccion == 1 ? (
        <>
          <div className="mt-20 flex flex-wrap justify-between">
            <ToastContainer pauseOnFocusLoss={false} />

            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={handleModalNuevoCliente}
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
                      Nuevo Cliente
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => handlePlanesActivos()}
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
                      Planes Activos
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccion(3)}
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
                      Asistencias
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>

          <div className="mt-5 flex flex-wrap justify-between">
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccion(4)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <CalendarDaysIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Proximos Vencimientos
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccion(5)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <QueueListIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Listado de Clientes
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccion(6)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <UsersIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Listado de Usuarios
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>

          <div className="mt-5 flex flex-wrap justify-between">
            <div
              className="w-1/2 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccion(7)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <HandThumbDownIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Clientes inactivos
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/2 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccion(10)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <FingerPrintIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Ingresar Visitante
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : seleccion == 2 ? (
        <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <Planes />
          </Card>
        </div>
      ) : seleccion == 3 ? (
        <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <ListadodeAsistencias />
          </Card>
        </div>
      ) : seleccion == 4 ? (
        <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <ListadodeProximosVencimientos />
          </Card>
        </div>
      ) : seleccion == 5 ? (
        <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <ListadodeClientes />
          </Card>
        </div>
      ) : seleccion == 6 ? (
        <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <ListadoUsuarios />
          </Card>
        </div>
      ) : seleccion == 7 ? (
        <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <ListadodeClientesInactivos />
          </Card>
        </div>
      ) : seleccion == 8 ? (
        <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <Profile />
          </Card>
        </div>
      ) : seleccion == 9 ? (
        <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <ListadoAsistenciasProfile />
          </Card>
        </div>
      ) : seleccion == 10 ? (
        <div className=" mb-1 mt-4 grid grid-cols-1 gap-6  xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <RegistrarClientes />
          </Card>
        </div>
      ) : (
        ""
      )}

      {/* {cargando ? <Cargando /> : ""} */}
      {modalNuevoCliente ? <ModalNuevoCliente /> : ""}
      {modalNuevoCliente2 ? <ModalNuevoCliente2 /> : ""}
      {modalResumen ? <ModalResumen /> : ""}
      {modalNuevoPlan ? <ModalNuevoPlan /> : ""}
      {modalEditarCliente ? <EditarCliente /> : ""}
      {modalModificarPlan ? <ModalModificarPlan /> : ""}
      {modalEditarAsistencia ? <ModalEditarAsistencia /> : ""}
      {modalEditarUsuario ? <ModalEditarUsuario /> : ""}
      {modalEliminarUsuario ? <ModalEliminarUsuario /> : ""}
    </>
  );
}

export default Clientes;
