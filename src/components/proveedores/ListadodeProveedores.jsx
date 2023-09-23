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

import useProveedores from "@/hooks/useProveedores";
import { formatearFecha } from "@/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";
import { setOpenConfigurator } from "@/context";

const ListadoDeProveedores = () => {
  const {
    ListadoDeProveedores,
    proveedores,
    obtenerProveedores,
    setSelectProveedores,
    selectProveedores,
    idEditarProveedor,
    setIdEditarProveedor,
  } = useProveedores();

  const navigate = useNavigate();

  const handleClick = async (e, _id) => {
    e.preventDefault();
    await setIdEditarProveedor(_id);
    setSelectProveedores(3);
  };

  useEffect(() => {
    const traerData = async () => {
      await obtenerProveedores();
    };
    traerData();
  }, []);

  const handleVolver = (e) => {
    e.preventDefault();
    setSelectProveedores(1);
    console.log(selectProveedores);
  };

  return (
    <>
      <div className="mb-4 mt-5 flex items-center justify-between">
        <Typography className="mb-5 ml-4 text-xl font-bold">
          Listado de Proveedores
        </Typography>
        <div>
          <Button className="mr-3" onClick={(e) => handleVolver(e)}>
            Volver
          </Button>
        </div>
      </div>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Proveedor", "Cuit", "Email", "Accion"].map((el) => (
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
            {proveedores.map(({ _id, nombre, cuit, email }, key) => {
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
                      {cuit}
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
                    </Typography>
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

export default ListadoDeProveedores;
