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
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import ModalEditarUsuario from "./ModalEditarUsuario";

const ListadoUsuarios = () => {
  const {
    usuarios,

    setPlanes,

    setNombreUsuario,

    setApellidoUsuario,

    setEmailUsuario,

    setCeluUsuario,
    setDniUsuario,
    setSeleccion,
    handleModalEditarUsuario,
    obtenerUsuarios,
    setIdUsuarioModificar,
    modalEditarUsuario,
  } = useClientes();

  useEffect(() => {
    const pedirData = async () => {
      await obtenerUsuarios();
    };
    pedirData();
  }, []);

  const handleEdit = async (celu, email, dni, apellido, nombre, plan, _id) => {
    setPlanes(plan);
    setNombreUsuario(nombre);
    setApellidoUsuario(apellido);
    setDniUsuario(dni);
    setEmailUsuario(email);
    setCeluUsuario(celu);
    setIdUsuarioModificar(_id);
    handleModalEditarUsuario();
  };

  return (
    <>
      <Typography className="mb-4 ml-4 mt-8 font-bold">
        Listado De Usuarios
      </Typography>

      <div className="mb-4 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <div className="max-h-[78vh] overflow-y-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead className="sticky top-0 bg-blue-50">
                  <tr>
                    {["Nombre", "Email", "Plan", "Accion"].map((el) => (
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
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(
                    (
                      {
                        _id,
                        nombre,
                        apellido,
                        plan,
                        email,
                        confirmado,
                        celu,
                        dni,
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
                                {nombre} {apellido}
                              </Typography>
                            </div>
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
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {celu}
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
                                  handleEdit(
                                    celu,
                                    email,
                                    dni,
                                    apellido,
                                    nombre,
                                    plan,
                                    _id
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
        {modalEditarUsuario ? <ModalEditarUsuario /> : ""}
      </div>
    </>
  );
};

export default ListadoUsuarios;
