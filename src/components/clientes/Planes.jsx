import { Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { formatearFecha } from "@/helpers/formatearFecha";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/solid";
import ModalModificarPlan from "./ModalModificarPlan";
import ModalNuevoPlan from "./ModalNuevoPlan";
import { ToastContainer } from "react-toastify";

const Planes = () => {
  const {
    mostrarPlanes,
    obtenerPlan,
    handleModalModificarPlan,
    obtenerPlanes,
    modalModificarPlan,
    handleModalNuevoPlan,
    modalNuevoPlan,
    actualizarListadoPLanes,
    setActualizarListadoPLanes,
    setModificarNombrePlan,
    setModificarDescripcionPlan,
    setModificarHorasSalas,
    setModificarPrecioPlan,
    setIdModificarPlan,
  } = useClientes();

  useEffect(() => {
    const mostrar = async () => {
      await obtenerPlanes();
    };
    mostrar();
  }, []);

  useEffect(() => {
    const mostrar = async () => {
      if (actualizarListadoPLanes) {
        await obtenerPlanes();
        setActualizarListadoPLanes(false);
      }
    };
    mostrar();
  }, [actualizarListadoPLanes]);

  const handleClick = async (id) => {
    obtenerPlan(id);

    handleModalModificarPlan();
  };

  const nuevoPlan = (e) => {
    e.preventDefault();
    handleModalNuevoPlan();
  };

  return (
    <>
      <div className="mr-5 mt-8 flex items-center justify-between">
        <Typography className="ml-5 font-bold">Planes Activos</Typography>
        <PlusIcon
          className="h-8 w-8  text-green-500 hover:cursor-pointer"
          onClick={(e) => nuevoPlan(e)}
        />
      </div>
      <ToastContainer pauseOnFocusLoss={false} />

      <div className="mb-4 mt-8 grid grid-cols-1 gap-6  xl:grid-cols-3">
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
                            <div className="flex items-center justify-center gap-4">
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
                            <div className="flex items-center justify-center gap-4">
                              <EyeIcon
                                className="h-8 w-8 hover:cursor-pointer"
                                onClick={(e) => {
                                  handleClick(_id);
                                }}
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
        {modalModificarPlan ? <ModalModificarPlan /> : ""}
        {modalNuevoPlan ? <ModalNuevoPlan /> : null}
      </div>
    </>
  );
};

export default Planes;
