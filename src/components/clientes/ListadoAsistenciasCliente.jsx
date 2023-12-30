import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import useClientes from "@/hooks/useClientes";
import {
  ArrowLeftCircleIcon,
  ListBulletIcon,
  PencilIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";
import { CheckIcon } from "@heroicons/react/24/outline";
import Cargando from "../deTodos/Cargando";
import { formatearFecha } from "@/helpers/formatearFecha";
import ModalEditarAsistencia from "./ModalEditarAsistencia";

const ListadoAsistenciasCliente = () => {
  const {
    nombreClienteListadoAsistencias,
    apellidoClienteListadoAsistencias,
    idClienteListadoAsistencias,
    asistenciaCliente,
    obtenerAsistenciasPorUsuario,
    handleModalEditarAsistencia,
    modalEditarAsistencia,
    setFechaAsistenciaModificar,
    idModificarAsistencia,
    setIdModificarAsistencia,
    actualizoListadoAsistencias,
    setActualizoListadoAsistencias,
  } = useClientes();

  useEffect(() => {
    const obtenerUsers = async () => {
      await obtenerAsistenciasPorUsuario(idClienteListadoAsistencias);
    };
    obtenerUsers();
  }, []);

  useEffect(() => {
    const obtenerUsers = async () => {
      if (actualizoListadoAsistencias) {
        await obtenerAsistenciasPorUsuario(idClienteListadoAsistencias);
        setActualizoListadoAsistencias(false);
      }
    };
    obtenerUsers();
  }, [actualizoListadoAsistencias]);

  const handleEditarAsist = (id, fecha) => {
    setIdModificarAsistencia(id);
    setFechaAsistenciaModificar(fecha);
    handleModalEditarAsistencia();
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      <div className="mb-4 mt-8 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Typography className="ml-4 font-bold">
          Listado asistencias de {nombreClienteListadoAsistencias}
          {apellidoClienteListadoAsistencias}
        </Typography>
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <div className="max-h-[78vh] overflow-y-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead className="sticky top-0 bg-blue-50">
                  <tr>
                    {["Nombre", "Fecha", "Accion"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 px-16 py-3 text-center"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {asistenciaCliente.map(
                    ({ _id, nombreUsuario, fecha }, key) => {
                      const className = `py-3 px-10 ${
                        key === asistenciaCliente.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={_id}>
                          <td className={className}>
                            <div className="flex items-center justify-center gap-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {nombreUsuario}
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center justify-center gap-4">
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600"
                              >
                                {formatearFecha(fecha)}
                              </Typography>
                            </div>
                          </td>

                          <td className={className}>
                            <div className="flex items-center justify-center gap-4">
                              <PencilIcon
                                title="Editar Asistencia"
                                className={`$ mx-1 h-8 w-8 items-center gap-0.5 px-0.5 hover:cursor-pointer`}
                                onClick={(e) => handleEditarAsist(_id, fecha)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
        <Cargando />
        {modalEditarAsistencia ? <ModalEditarAsistencia /> : null}
      </div>
    </>
  );
};

export default ListadoAsistenciasCliente;
