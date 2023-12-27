import {
  Avatar,
  Button,
  CardBody,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { formatearFecha } from "@/helpers/formatearFecha";
import { formatearHora } from "@/helpers/formatearHora";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import useAuth from "@/hooks/useAuth";
import Cargando from "../deTodos/Cargando";

const ListadoAsistenciasProfile = () => {
  const {
    idAsistencias,
    obtenerAsistencias,
    asistencias,
    planprofileAsistencias,
    handleModalEditarAsistencia,
    asistioHoyProfileAsistencias,
    fechaAsistenciaModificar,
    setFechaAsistenciaModificar,
    idModificarAsistencia,
    setIdModificarAsistencia,
    eliminarAsistencia,
    setSeleccion,
    renovarListadoAsistenciaProfile,
    setRenovarListadoAsistenciaProfile,
  } = useClientes();

  const [renderizo, setRenderizo] = useState(false);

  const { handleCargando, cargando } = useAuth();

  useEffect(() => {
    const obtener = async () => {
      handleCargando();
      await obtenerAsistencias(idAsistencias);
      handleCargando();
    };
    obtener();
  }, []);

  useEffect(() => {
    const obtener = async () => {
      if (renderizo) {
        await obtenerAsistencias(idAsistencias);
        setRenderizo(false);
      }
    };
    obtener();
  }, [renderizo]);

  useEffect(() => {
    const obtener = async () => {
      if (renovarListadoAsistenciaProfile) {
        await obtenerAsistencias(idAsistencias);
        setRenovarListadoAsistenciaProfile(false);
      }
    };
    obtener();
  }, [renovarListadoAsistenciaProfile]);

  const handleEditarAsistencia = (id, fecha) => {
    setRenderizo(true);
    setIdModificarAsistencia(id);
    setFechaAsistenciaModificar(fecha);
    handleModalEditarAsistencia();
  };

  const handleEliminar = async (id) => {
    Swal.fire({
      title: "Seguro queres borrar esta asistencia?",
      text: "Esta accion es irrecuperable",
      icon: "question",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarAsistencia(id);
        setRenderizo(true);
      }
    });
  };

  const volverListado = (e) => {
    e.preventDefault();
    setSeleccion(3);
  };

  return (
    <>
      <div className="ml-3 mt-3 flex items-center">
        <ToastContainer pauseOnFocusLoss={false} />
        <button
          type="button"
          className="bg-red rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={(e) => volverListado(e)}
        >
          <ArrowLeftCircleIcon />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          ></svg>
        </button>
      </div>
      <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Fecha de asistencia", "Hora de asistencia", "Editar"].map(
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
            {asistencias.map(({ fecha, _id }, key) => {
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
                        {formatearFecha(fecha)}
                      </Typography>
                    </div>
                  </td>
                  <td className={className}>
                    <div className="flex items-center gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {formatearHora(fecha)} hs
                      </Typography>
                    </div>
                  </td>
                  <td className={className}>
                    <Typography
                      variant="small"
                      className="mx-2 flex text-xs font-medium text-blue-gray-600"
                    >
                      <Button
                        color="blue"
                        className={`} mx-1 items-center gap-0.5 px-0.5`}
                        fullWidth
                        onClick={(e) => handleEditarAsistencia(_id, fecha)}
                      >
                        <Typography color="inherit" className="font-normal">
                          Editar
                        </Typography>
                      </Button>
                      <Button
                        className={`mx-1 items-center gap-0.5 bg-red-500 px-0.5`}
                        fullWidth
                        onClick={(e) => handleEliminar(_id)}
                      >
                        <Typography color="inherit" className="font-normal">
                          Eliminar
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
      {cargando ? <Cargando /> : ""}
    </>
  );
};

export default ListadoAsistenciasProfile;
