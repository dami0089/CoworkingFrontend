import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import useContable from "@/hooks/useContable";
import { projectsTableData } from "@/data";
import { formatearFecha } from "@/helpers/formatearFecha";

const ListadoCripto = () => {
  const {
    handleModalNuevoMovimiento,
    movimientos,
    obtenerMovimiento,
    movimiento,
    handleModalEditarMovimiento,
    obtenerMovimientos,
  } = useContable();

  const handleClick = async (e, id) => {
    e.preventDefault();
    await obtenerMovimiento(id);
    if (movimiento != []) {
      handleModalEditarMovimiento();
    }
  };

  useEffect(() => {
    const traerInfo = async () => {
      await obtenerMovimientos();
    };
    traerInfo();
  }, []);

  return (
    <>
      {/* <div className="mt-5 mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2 ">
        <Card>
          <Button
            variant="gradient"
            color="blue"
            className="absolute -mt-4 grid h-16 w-16 place-items-center"
            onClick={handleModalNuevoMovimiento}
          >
            <PlusIcon />
          </Button>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Nuevo Movimiento
            </Typography>
          </CardBody>
        </Card>

        <Card>
          <Button
            variant="gradient"
            color="green"
            className="absolute -mt-4 grid h-16 w-16 place-items-center"
            // onClick={(e) => setSeleccion(4)}
          >
            <BuildingStorefrontIcon />
          </Button>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Rubros
            </Typography>
          </CardBody>
        </Card>
      </div> */}
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Fecha", "Nombre", "Concepto", "Debe", "Haber", "Editar"].map(
                (el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-6 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {movimientos.map(
              (
                {
                  _id,
                  fecha,
                  tipo,
                  descripcion,
                  precioNeto,
                  nombreCliente,
                  nombreProveedor,
                  entidad,
                },
                key
              ) => {
                const className = `py-3 px-5 ${
                  key === projectsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <>
                    {entidad == "Cripto" ? (
                      <>
                        <tr key={_id}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {formatearFecha(fecha)}
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {tipo === "Ingreso" ? nombreCliente : ""}{" "}
                              {tipo === "Gasto" ? nombreProveedor : ""}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {descripcion.length > 20
                                ? descripcion.slice(0, 20) + "..."
                                : descripcion}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {tipo == "Gasto" ? "$" : ""}{" "}
                              {tipo == "Gasto" ? precioNeto : ""}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {tipo == "Ingreso" ? "$" : ""}{" "}
                              {tipo == "Ingreso" ? precioNeto : ""}
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
                                onClick={(e) => handleClick(e, _id)}
                              >
                                <Typography
                                  color="inherit"
                                  className="font-medium capitalize"
                                >
                                  editar
                                </Typography>
                              </Button>
                            </Typography>
                          </td>
                        </tr>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </>
  );
};

export default ListadoCripto;
