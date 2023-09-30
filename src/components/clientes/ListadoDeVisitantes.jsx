import {
  Avatar,
  Button,
  CardBody,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { formatearFecha } from "@/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";
import { setOpenConfigurator } from "@/context";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const ListadoDeVisitantes = () => {
  const {
    visitas,
    obtenerVisitas,
    actualizarListadoVisitante,
    setActualizarListadoVisitante,
  } = useClientes();

  useEffect(() => {
    const obtenerInfo = async () => {
      await obtenerVisitas();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (actualizarListadoVisitante) {
        await obtenerVisitas();
        setActualizarListadoVisitante(false);
      }
    };
    obtenerInfo();
  }, [actualizarListadoVisitante]);

  // 1. Estado
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // mostraremos 10 ítems por página

  // Calcular número total de páginas
  const totalPages = Math.ceil(visitas.length / itemsPerPage);

  // 2. Mostrar los datos paginados
  const displayedVisitantes = visitas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Typography className="ml-5 mt-5 font-bold">
        Ultimos Visitantes
      </Typography>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Fecha", "Nombre", "Email", "Telefono", "Motivo"].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-6 text-center"
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
            {visitas.map(
              (
                {
                  _id,
                  fechaVisita,
                  nombre,
                  fechaNac,
                  email,
                  celular,
                  nacionalidad,
                  dni,
                  motivo,
                },
                key
              ) => {
                const className = `py-3 px-5 ${
                  key === projectsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={_id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {formatearFecha(fechaVisita)}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {nombre}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {celular}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {motivo}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        <div className="mt-5 flex justify-center space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                index + 1 === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </CardBody>
    </>
  );
};

export default ListadoDeVisitantes;
