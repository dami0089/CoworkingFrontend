import { React, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { PlusIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import {
  CalendarDaysIcon,
  CheckBadgeIcon,
  ClockIcon,
  FingerPrintIcon,
  HandThumbDownIcon,
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

import ModalModificarPlan from "@/components/clientes/ModalModificarPlan";
import ListadodeClientesInactivos from "@/components/clientes/ListadodeClientesInactivos";
import ListadodeProximosVencimientos from "@/components/clientes/ListadodeProximosVencimientos";
import ListadodeAsistencias from "@/components/clientes/ListadodeAsistencias";
import ListadoAsistenciasProfile from "@/components/clientes/ListadoAsistenciasProfile";
import ModalEditarAsistencia from "@/components/clientes/ModalEditarAsistencia";
import ModalEditarUsuario from "@/components/clientes/ModalEditarUsuario";
import ModalEliminarUsuario from "@/components/clientes/ModalEliminarUsuario";
import RegistrarClientes from "@/components/clientes/RegistrarClientes";
import { useNavigate } from "react-router-dom";
import ModalEditarCliente from "@/components/clientes/ModalEditarCliente";
import Cargando from "@/components/deTodos/Cargando";
import ModalNuevoUsuarioAdmin from "@/components/clientes/ModalNuevoUsuarioAdmin";

export function Clientes() {
  const navigate = useNavigate();
  const {
    handleModalNuevoCliente,
    seleccion,
    setSeleccion,
    handleModalNuevoPlan,
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
    handleModalNuevoUsuarioAdmin,
    nuevoUsuarioAdmin,
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
    navigate("/clientes/planes-activos");
  };

  const handleAsistencias = (e) => {
    e.preventDefault();
    navigate("/clientes/asistencias");
  };

  const handleVencimientos = (e) => {
    e.preventDefault();
    navigate("/clientes/proximos-vencimientos");
  };

  const handleListadoClientes = (e) => {
    e.preventDefault();
    navigate("/clientes/listado-clientes");
  };

  const handleUsuarios = (e) => {
    e.preventDefault();
    navigate("/clientes/listado-usuarios");
  };

  const handleInactivos = (e) => {
    e.preventDefault();
    navigate("/clientes/listado-clientes-inactivos");
  };

  const handleIngresarVisitante = (e) => {
    e.preventDefault();
    navigate("/clientes/ingresar-visitante");
  };

  const handleModalNuevoUsuarioAdministrador = () => {
    handleModalNuevoUsuarioAdmin();
  };

  return (
    <>
      <>
        <div className="mt-8 flex flex-wrap justify-between ">
          <ToastContainer pauseOnFocusLoss={false} />

          <div
            className="w-full p-2 hover:cursor-pointer md:w-1/2 lg:w-1/3"
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
            className="w-full p-2 hover:cursor-pointer md:w-1/2 lg:w-1/3"
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
            className="w-full p-2 hover:cursor-pointer md:w-1/2 lg:w-1/3"
            onClick={(e) => handleAsistencias(e)}
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
            className="w-full p-2 hover:cursor-pointer md:w-1/2 lg:w-1/3"
            onClick={(e) => handleVencimientos(e)}
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
            className="w-full p-2 hover:cursor-pointer md:w-1/2 lg:w-1/3"
            onClick={(e) => handleListadoClientes(e)}
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
                    Clientes Activos
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-full p-2 hover:cursor-pointer md:w-1/2 lg:w-1/3"
            onClick={(e) => handleUsuarios(e)}
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
            className="w-full p-2 hover:cursor-pointer md:w-1/3"
            onClick={(e) => handleInactivos(e)}
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
            className="w-full p-2 hover:cursor-pointer md:w-1/3"
            onClick={(e) => handleIngresarVisitante(e)}
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
          <div
            className="w-full p-2 hover:cursor-pointer md:w-1/3"
            onClick={(e) => handleModalNuevoUsuarioAdministrador(e)}
          >
            <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <a href="#" className="relative block">
                    <UserGroupIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-600 dark:text-white">
                    Nuevo Usuario Admin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {modalNuevoCliente ? <ModalNuevoCliente /> : ""}
      {modalNuevoCliente2 ? <ModalNuevoCliente2 /> : ""}
      {modalResumen ? <ModalResumen /> : ""}
      {modalNuevoPlan ? <ModalNuevoPlan /> : ""}
      {modalEditarCliente ? <ModalEditarCliente /> : ""}
      <Cargando />
      {modalEditarAsistencia ? <ModalEditarAsistencia /> : ""}
      {modalEliminarUsuario ? <ModalEliminarUsuario /> : ""}
      {nuevoUsuarioAdmin ? <ModalNuevoUsuarioAdmin /> : null}
    </>
  );
}

export default Clientes;
