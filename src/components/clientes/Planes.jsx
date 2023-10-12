import {
  Avatar,
  Button,
  Card,
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
import ModalModificarPlan from "./ModalModificarPlan";

const Planes = () => {
  const {
    mostrarPlanes,
    obtenerPlan,
    handleModalModificarPlan,
    obtenerPlanes,
    modalModificarPlan,
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
      <div className="mb-4 mt-8 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Typography className="ml-4 font-bold">Planes Activos</Typography>
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0 text-center">
            <div className="max-h-[78vh] overflow-y-auto">
              <table className=" w-full min-w-[640px] table-auto text-center">
                <thead className="sticky top-0 bg-blue-50">
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
                        className="border-b border-blue-gray-50 px-6 py-3 text-center"
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
            </div>
          </CardBody>
        </Card>
        {modalModificarPlan ? <ModalModificarPlan /> : ""}
      </div>
    </>
  );
};

export default Planes;
