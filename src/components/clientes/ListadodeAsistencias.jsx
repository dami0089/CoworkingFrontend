import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import useClientes from "@/hooks/useClientes";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";

const ListadodeAsistencias = () => {
  const {
    usuarios,
    setSeleccion,
    almacenarAsistencia,
    idAsistencias,
    setIdAsistencias,
    setNombreProfileAsistencia,
    planprofileAsistencias,
    setPlanProfileAsistencias,
    asistencias,
    setAsistioHoyProfileAsistencias,
    dataAsistencia,
    obtenerUsuarios,
    resetAsistencias,
  } = useClientes();

  const [actualizoListado, setActualizoListado] = useState(false);

  useEffect(() => {
    const obtenerUsers = async () => {
      await obtenerUsuarios();
    };
    obtenerUsers();
  }, []);

  useEffect(() => {
    const obtenerUsers = async () => {
      if (actualizoListado) {
        await obtenerUsuarios();
        setActualizoListado(false);
      }
    };
    obtenerUsers();
  }, [actualizoListado]);

  const handleAsistencia = async (id) => {
    await almacenarAsistencia(id);
    setActualizoListado(true);

    // setSeleccion(8);
  };

  const handleAsistencia2 = async (id, nombre, apellido, plan, asistioHoy) => {
    let nomb = nombre + " " + apellido;
    setSeleccion(9);
    setNombreProfileAsistencia(nomb);
    setIdAsistencias(id);
    setPlanProfileAsistencias(plan);
    setAsistioHoyProfileAsistencias(asistioHoy);
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      <div className="mb-4 mt-8 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Typography className="ml-4 font-bold">Planes Activos</Typography>
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <div className="max-h-[78vh] overflow-y-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead className="sticky top-0 bg-blue-50">
                  <tr>
                    {["Nombre", "Plan", "Asistio?"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 px-16 py-3 text-left"
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
                  {usuarios
                    .filter(
                      (usuario) =>
                        usuario.isActivo &&
                        usuario.plan === "3 Veces por semana"
                    )
                    .map(({ nombre, apellido, plan, _id, asistioHoy }, key) => {
                      const className = `py-3 px-10 ${
                        key === usuarios.length - 1
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
                              {plan}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography
                              variant="small"
                              className="mx-2 flex text-xs font-medium text-blue-gray-600"
                            >
                              <Button
                                color="blue"
                                className={`mx-1 items-center gap-0.5 px-0.5 ${
                                  asistioHoy ? "bg-green-500" : "bg-gray-500"
                                }`}
                                fullWidth
                                onClick={(e) => handleAsistencia(_id)}
                              >
                                <Typography
                                  color="inherit"
                                  className="font-normal"
                                >
                                  {asistioHoy ? "Asistió" : "Asistencia"}
                                </Typography>
                              </Button>
                              <Button
                                color="blue"
                                className="mx-1 items-center gap-3 px-3 capitalize"
                                fullWidth
                                onClick={(e) =>
                                  handleAsistencia2(
                                    _id,
                                    nombre,
                                    apellido,
                                    plan,
                                    asistioHoy
                                  )
                                }
                              >
                                <Typography
                                  color="inherit"
                                  className="font-medium capitalize"
                                >
                                  Ver
                                </Typography>
                              </Button>
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ListadodeAsistencias;
