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
  BuildingStorefrontIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";

import ModalNuevoCliente from "@/components/clientes/ModalNuevoCliente";
import ModalNuevoCliente2 from "@/components/clientes/ModalNuevoCliente2";
import useClientes from "@/hooks/useClientes";
import ModalResumen from "@/components/clientes/ModalResumen";
import ListadodeClientes from "../../../components/clientes/ListadodeClientes";
import ListadoUsuarios from "../../../components/clientes/ListadoUsuarios";
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

  return seleccion == 1 ||
    seleccion == 2 ||
    (seleccion == 3) |
      (seleccion == 4) |
      (seleccion == 6) |
      (seleccion == 7) |
      (seleccion == 8) ? (
    <>
      <div className="mt-12">
        <ToastContainer pauseOnFocusLoss={false} />

        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 ">
          <Card onClick={handleModalNuevoCliente} className="cursor-pointer">
            <Card
              variant="gradient"
              // color="blue"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center bg-blue-gray-500 text-white"
            >
              <PlusIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Nuevo cliente
              </Typography>
            </CardBody>
          </Card>
          <Card onClick={(e) => log} className="cursor-pointer">
            <Card
              variant="gradient"
              // color="blue"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center bg-blue-gray-400 text-white"
            >
              <BanknotesIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Nueva Factura
              </Typography>
            </CardBody>
          </Card>
          <Card onClick={(e) => setSeleccion(4)} className="cursor-pointer">
            <Card
              variant="gradient"
              // color="blue"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center bg-blue-gray-300 text-white"
            >
              <BuildingStorefrontIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Planes
              </Typography>
            </CardBody>
          </Card>
          <Card onClick={(e) => setSeleccion(7)} className="cursor-pointer">
            <Card
              variant="gradient"
              // color="blue"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center bg-blue-gray-200 text-white"
            >
              <PlusCircleIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Asistencias
              </Typography>
            </CardBody>
          </Card>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  {seleccion == 1 ? "Proximos Vencimientos" : ""}
                  {seleccion == 2 ? "Listado de Clientes" : ""}
                  {seleccion == 3 ? "Listado de Usuarios" : ""}
                  {seleccion == 4 ? "Planes" : ""}
                  {seleccion == 6 ? "Listado de Clientes Inactivos" : ""}
                  {seleccion == 7 ? "Asistencias" : ""}
                  {seleccion == 8 ? "Perfil de asistencias de" : ""}
                </Typography>
                <Typography
                  variant="small"
                  className={`flex items-center gap-1 font-normal text-blue-gray-600 ${
                    planprofileAsistencias ? "text-black" : ""
                  }`}
                >
                  {seleccion == 1 ? "" : ""}
                  {seleccion == 2 ? "" : ""}
                  {seleccion == 3 ? "" : ""}
                  {seleccion == 4 ? "" : ""}
                  {seleccion == 8 ? nombreProfileAsistencia : ""}
                </Typography>
                <Typography
                  variant="small"
                  className={`flex items-center gap-1 font-normal text-blue-gray-600 ${
                    planprofileAsistencias ? "font-bold" : ""
                  }`}
                >
                  {seleccion == 8 ? planprofileAsistencias : ""}
                </Typography>
              </div>

              <Menu placement="left-start">
                {/* <MenuHandler>
                  <IconButton size="sm" variant="text" color="blue-gray">
                    <EllipsisVerticalIcon
                      strokeWidth={3}
                      fill="currenColor"
                      className="h-6 w-6"
                    />
                  </IconButton>
                </MenuHandler> */}

                <div>
                  {(seleccion >= 1 && seleccion <= 3) || seleccion == 6 ? (
                    <>
                      <div className="flex justify-center">
                        <Button
                          className="mx-1 my-2 w-1/4 bg-blue-900 text-center text-sm"
                          onClick={(e) => setSeleccion(1)}
                        >
                          Proximos Vencimientos
                        </Button>
                        <Button
                          className="mx-1 my-2 w-1/4 bg-blue-800 text-center text-sm"
                          onClick={(e) => setSeleccion(2)}
                        >
                          Clientes Activos
                        </Button>
                        <Button
                          className="mx-1 my-2 w-1/4 bg-blue-700 text-center text-sm"
                          onClick={(e) => setSeleccion(3)}
                        >
                          Listado de Usuarios
                        </Button>
                        <Button
                          className="mx-1 my-2 w-1/4 bg-blue-600 text-center text-sm"
                          onClick={(e) => setSeleccion(6)}
                        >
                          Clientes Inactivos
                        </Button>
                      </div>

                      {/* <MenuItem onClick={(e) => setSeleccion(1)}>
                        Proximos Vencientos
                      </MenuItem>
                      <MenuItem onClick={(e) => setSeleccion(2)}>
                        Listado de Clientes
                      </MenuItem>
                      <MenuItem onClick={(e) => setSeleccion(3)}>
                        Listado de Usuarios
                      </MenuItem> */}
                    </>
                  ) : seleccion == 4 ? (
                    <>
                      <Button
                        className="w-30 mx-2 bg-green-300 text-center "
                        onClick={(e) => handleClick()}
                      >
                        Nuevo Plan
                      </Button>
                      <Button
                        className="w-30 mx-2 bg-blue-gray-300 text-center "
                        onClick={(e) => setSeleccion(2)}
                      >
                        Listado de Clientes
                      </Button>
                      {/* <MenuItem onClick={(e) => handleClick()}>
                        Nuevo Plan
                      </MenuItem>

                      <MenuItem onClick={(e) => }>
                        Cerrar Menu planes
                      </MenuItem> */}
                    </>
                  ) : seleccion == 8 ? (
                    <>
                      <Button
                        className="w-30 mx-2 bg-blue-gray-300 text-center "
                        onClick={(e) => setSeleccion(7)}
                      >
                        Volver
                      </Button>
                      {/* <MenuItem onClick={(e) => handleClick()}>
                        Nuevo Plan
                      </MenuItem>

                      <MenuItem onClick={(e) => }>
                        Cerrar Menu planes
                      </MenuItem> */}
                    </>
                  ) : seleccion == 7 ? (
                    <>
                      <Button
                        className="w-30 mx-2 bg-blue-gray-300 text-center "
                        onClick={(e) => resetAsistencias()}
                      >
                        Reset Asistencias
                      </Button>
                      {/* <MenuItem onClick={(e) => handleClick()}>
                        Nuevo Plan
                      </MenuItem>

                      <MenuItem onClick={(e) => }>
                        Cerrar Menu planes
                      </MenuItem> */}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </Menu>
            </CardHeader>
            {seleccion == 1 ? <ListadodeProximosVencimientos /> : ""}
            {seleccion == 2 ? <ListadodeClientes /> : ""}
            {seleccion == 3 ? <ListadoUsuarios /> : ""}
            {seleccion == 4 ? <Planes /> : ""}
            {seleccion == 6 ? <ListadodeClientesInactivos /> : ""}
            {seleccion == 7 ? <ListadodeAsistencias /> : ""}
            {seleccion == 8 ? <ListadoAsistenciasProfile /> : ""}
          </Card>
        </div>
        {modalNuevoCliente ? <ModalNuevoCliente /> : ""}
        {modalNuevoCliente2 ? <ModalNuevoCliente2 /> : ""}
        {modalResumen ? <ModalResumen /> : ""}
        {modalNuevoPlan ? <ModalNuevoPlan /> : ""}
        {modalEditarCliente ? <EditarCliente /> : ""}
        {modalModificarPlan ? <ModalModificarPlan /> : ""}
        {modalEditarAsistencia ? <ModalEditarAsistencia /> : ""}
        {modalEditarUsuario ? <ModalEditarUsuario /> : ""}
        {modalEliminarUsuario ? <ModalEliminarUsuario /> : ""}
      </div>
    </>
  ) : seleccion == 5 ? (
    <Profile />
  ) : (
    ""
  );
}

export default Clientes;
