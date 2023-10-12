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
import { useNavigate } from "react-router-dom";
import { setOpenConfigurator } from "@/context";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const ListadodeClientes = () => {
  const {
    clientes,
    setObtenerUs,
    setSeleccion,
    handleModalEditarCliente,
    setCuitEditar,
    cuitEditar,
    // obtenerUser,
    setObtenerUsuario,
    obtenerClientes,
  } = useClientes();

  useEffect(() => {
    const obtenerInfo = async () => {
      await obtenerClientes();
    };
    obtenerInfo();
  }, []);

  const navigate = useNavigate();

  const handleClick = async (e, _id, usuarios) => {
    e.preventDefault();
    await setCuitEditar(_id);
    // obtenerUser([usuarios]);
    navigate("/clientes/perfil");
  };

  const handleClickEditar = async (e, _id) => {
    e.preventDefault();
    await setCuitEditar(_id);
    handleModalEditarCliente();
    console.log("editando");
  };

  return (
    <>
      <Typography className="mb-4 ml-4 mt-8 font-bold">
        Listado de clientes Activos
      </Typography>

      <div className="mb-4 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <div className="max-h-[78vh] overflow-y-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead className="sticky top-0 bg-blue-50">
                  <tr>
                    {["Cliente", "Vencimiento", "Mail Factura", "Accion"].map(
                      (el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 px-6 py-3 text-left"
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
                  {clientes
                    .filter((cliente) => cliente.isActivo) // filtrar solo los clientes con isActivo = true
                    .map(
                      (
                        {
                          _id,
                          nombre,
                          fechaVencimiento,
                          mailFactura,
                          usuarios,
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
                              <Typography
                                variant="small"
                                className="mx-2 flex text-xs font-medium text-blue-gray-600"
                              >
                                <Button
                                  color="blue"
                                  className="mx-1 items-center gap-4 px-6 capitalize"
                                  fullWidth
                                  onClick={(e) => handleClick(e, _id, usuarios)}
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
                      }
                    )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ListadodeClientes;
