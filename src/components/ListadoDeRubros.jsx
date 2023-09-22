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

const ListadoDeRubros = () => {
  const { ListadoDeProveedores, rubros } = useProveedores();

  const navigate = useNavigate();

  return (
    <>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Nombre", "", "", "Accion"].map((el) => (
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
            {rubros.map(({ _id, nombre }, key) => {
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
                    <div className="flex items-center gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      ></Typography>
                    </div>
                  </td>
                  <td className={className}>
                    <div className="flex items-center gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      ></Typography>
                    </div>
                  </td>

                  <td className={className}>
                    <div className="w-5/12">
                      <Typography
                        variant="small"
                        className="mx-1 flex text-xs font-medium text-blue-gray-600"
                      >
                        <Button
                          color="gradient"
                          className="items-end gap-1 px-1 capitalize"
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
            })}
          </tbody>
        </table>
      </CardBody>
    </>
  );
};

export default ListadoDeRubros;
