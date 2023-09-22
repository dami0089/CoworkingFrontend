import { Button, CardBody, Typography } from "@material-tailwind/react";
import React from "react";
import { projectsTableData } from "@/data";

import { formatearFecha } from "@/helpers/formatearFecha";
import useProveedores from "@/hooks/useProveedores";

const ListadodeFacturasAPagar = () => {
  const {
    facturasPendientesProveedores,
    handleModalNuevoPago,
    proveedorPago,
    setProveedorPago,
    numeroFacturaPago,
    setNumeroFacturaPago,
    descripcionPago,
    setDescripcionPago,
    precioBrutoPago,
    setPrecioBrutoPago,
    ivaPago,
    setIvaPago,
    precioNetoPago,
    setPrecioNetoPago,
    tipoComprobantePago,
    setTipoComprobantePago,
    idProveedorPago,
    setIdProveedorPago,
    idFacturaAPagar,
    setIdFacturaAPagar,
  } = useProveedores();

  // console.log(facturasPendientesProveedores);

  const handlePago = async (
    e,
    nombreProveedor,
    numero,
    descripcion,
    precioBruto,
    iva,
    precioNeto,
    proveedor,
    tipo,
    _id
  ) => {
    setProveedorPago(nombreProveedor);
    setNumeroFacturaPago(numero);
    setPrecioBrutoPago(precioBruto);
    setDescripcionPago(descripcion);
    setIvaPago(iva);
    setPrecioNetoPago(precioNeto);
    setTipoComprobantePago(tipo);
    setIdProveedorPago(proveedor);
    setIdFacturaAPagar(_id);
    e.preventDefault();
    handleModalNuevoPago();
  };

  return (
    <>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Fecha de carga",
                "Proveedor",
                "Descripcion",
                "Importe",
                "Fecha de Pago",
                "Accion",
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
            {facturasPendientesProveedores.map(
              (
                {
                  fecha,
                  nombreProveedor,
                  descripcion,
                  precioNeto,
                  fechaPago,
                  numero,
                  precioBruto,
                  proveedor,
                  iva,
                  tipo,
                  _id,
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
                          className="text-center"
                        >
                          {formatearFecha(fecha)}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-center text-xs font-medium text-blue-gray-600"
                      >
                        {nombreProveedor}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {descripcion}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text center text-xs font-medium text-blue-gray-600"
                      >
                        $ {precioNeto}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {formatearFecha(fechaPago)}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="mx-2 flex text-xs font-medium text-blue-gray-600"
                      >
                        <Button
                          className=" pgap-x-6 mx-1 items-center gap-4 bg-green-500 align-middle capitalize"
                          onClick={(e) =>
                            handlePago(
                              e,
                              nombreProveedor,
                              numero,
                              descripcion,
                              precioBruto,
                              iva,
                              precioNeto,
                              proveedor,
                              tipo,
                              _id
                            )
                          }
                        >
                          <Typography className="mr-4 font-medium capitalize">
                            Pagar
                          </Typography>
                        </Button>
                        <Button className="items-center gap-4 px-6 capitalize">
                          <Typography
                            color="inherit"
                            className="mr-4 font-medium capitalize"
                          >
                            editar
                          </Typography>
                        </Button>
                      </Typography>
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

export default ListadodeFacturasAPagar;
