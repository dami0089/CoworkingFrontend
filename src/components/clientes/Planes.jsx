import {
  Avatar,
  Button,
  CardBody,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { formatearFecha } from "@/helpers/formatearFecha";
import { ArrowLeftCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

const Planes = () => {
  const {
    mostrarPlanes,
    obtenerPlan,
    handleModalModificarPlan,
    obtenerPlanes,
    setSeleccion,
  } = useClientes();

  useEffect(() => {
    const mostrar = async () => {
      await obtenerPlanes();
    };
    mostrar();
  }, []);

  // console.log(mostrarPlanes);

  const handleClick = async (id) => {
    obtenerPlan(id);
    handleModalModificarPlan();
  };

  return (
    <>
      <div className="ml-3 mt-3">
        <button
          type="button"
          className="bg-red rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={(e) => setSeleccion(1)}
        >
          <ArrowLeftCircleIcon />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          ></svg>
        </button>
      </div>

      <CardBody className="mt-4  overflow-x-scroll px-0 pt-0 pb-2 text-center">
        <table className="mt-3 w-full min-w-[640px] table-auto text-center">
          <thead>
            <tr>
              {[
                "Nombre",
                "Horas Salas",
                "Precio",
                "Ult. Actualizacion",
                "Editar",
              ].map((el) => (
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
            {mostrarPlanes.map(
              ({ nombre, horasSalas, precio, updatedAt, _id }, key) => {
                const className = `py-3 px-5 ${
                  key === projectsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={nombre}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {nombre}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {horasSalas}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        $ {precio}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {formatearFecha(updatedAt)}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="mx-2 flex text-xs font-medium text-blue-gray-600"
                      >
                        <Button
                          color="gradient"
                          className="items-center gap-4 px-6 capitalize"
                          fullWidth
                          onClick={(e) => {
                            handleClick(_id);
                          }}
                        >
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            editar
                          </Typography>
                        </Button>
                      </Typography>
                      {/* <Progress
                          value={fechaVencimiento}
                          variant="gradient"
                          className="h-1"
                        /> */}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </>
  );
};

export default Planes;
