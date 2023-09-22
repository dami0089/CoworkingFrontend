import {
  Avatar,
  Button,
  CardBody,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import React from "react";
import { projectsTableData } from "@/data";

import useProveedores from "@/hooks/useProveedores";
import { formatearFecha } from "@/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";
import { setOpenConfigurator } from "@/context";

const PagadoEnElMes = () => {
  const { ListadoDeProveedores } = useProveedores();

  const navigate = useNavigate();

  const handleClick = async (e, _id) => {
    // e.preventDefault();
    // await setCuitEditar(_id);
    // setSeleccion(5);
  };

  return (
    <>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Cliente", "Vencimiento", "Mail Factura", "Accion"].map(
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
          {/* <tbody>
            {clientes.map(
              ({ _id, nombre, fechaVencimiento, mailFactura, cuit }, key) => {
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
                          {nombre}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {formatearFecha(fechaVencimiento)}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {mailFactura}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="w-10/12">
                        <Typography
                          variant="small"
                          className="mx-2 flex text-xs font-medium text-blue-gray-600"
                        >
                          <Button
                            color="blue"
                            className="mx-1 items-center gap-4 px-6 capitalize"
                            fullWidth
                            onClick={(e) => handleClick(e, _id)}
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              ver
                            </Typography>
                          </Button>
                          <Button
                            color="gradient"
                            className="items-center gap-4 px-6 capitalize"
                            fullWidth
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              editar
                            </Typography>
                          </Button>
                        </Typography>
           
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody> */}
        </table>
      </CardBody>
    </>
  );
};

export default PagadoEnElMes;
