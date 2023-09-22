import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { projectsTableData } from "@/data";

import useContable from "@/hooks/useContable";
import { formatearFecha } from "@/helpers/formatearFecha";

const ListadoBanco = () => {
  const {
    handleModalNuevoMovimiento,
    movimientos,
    obtenerMovimiento,
    movimiento,
    handleModalEditarMovimiento,
    obtenerMovimientos,
    setTipo,
    setEntidad,
    setIdMovimiento,
    setIdProveedor,
    setNumeroFactura,
    setDescripcion,
    setPrecioBruto,
    setIdCliente,
    setSelectorContable,
  } = useContable();

  useEffect(() => {
    const traerInfo = async () => {
      await obtenerMovimientos();
    };
    traerInfo();
  }, []);

  const handleClick = async (
    e,
    id,
    entidad,
    tipo,
    cliente,
    numeroFactura,
    descripcion,
    precioBruto,
    proveedor
  ) => {
    e.preventDefault();
    setTipo(tipo);
    setEntidad(entidad);

    if (tipo === "Ingreso") {
      setIdCliente(cliente);
    } else if (tipo === "Gasto") {
      setIdProveedor(proveedor);
    }
    setNumeroFactura(numeroFactura);
    setDescripcion(descripcion);
    setPrecioBruto(precioBruto);
    handleModalEditarMovimiento();
  };

  return (
    <>
      <div className="mb-4 mt-10 flex items-center justify-between">
        <Typography className="mb-5 ml-4 text-xl font-bold">
          Listado Banco
        </Typography>
        <div>
          <Button className="mr-3" onClick={(e) => setSelectorContable(1)}>
            Volver
          </Button>
        </div>
      </div>
      <CardBody className="mt-5 overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Fecha",
                "Nombre",
                "Descripcion",
                "Gastos",
                "Ingresos",
                "Editar",
              ].map((el) => (
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
              ))}
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
                  nombreCliente,
                  nombreProveedor,
                  precioNeto,
                  entidad,
                  cliente,
                  numeroFactura,
                  precioBruto,
                  proveedor,
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
                    {entidad == "Banco" ? (
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
                                onClick={(e) =>
                                  handleClick(
                                    e,
                                    _id,
                                    entidad,
                                    tipo,
                                    cliente,
                                    numeroFactura,
                                    descripcion,
                                    precioBruto,
                                    proveedor
                                  )
                                }
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

export default ListadoBanco;
