import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { formatearFecha } from "@/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import Cargando from "../deTodos/Cargando";
import useAuth from "@/hooks/useAuth";
import ModalNuevoPagoListadoVencimiento from "./ModalNuevoPagoListadoVencimiento";
import useContable from "@/hooks/useContable";

const ListadodeProximosVencimientos = () => {
  const {
    clientes,
    setSeleccion,
    setCuitEditar,
    obtenerClientes,
    recordarVencimiento,
    recordarVencimientoWhatsapp,
    handlePagoVencimiento,
    modalPagoListado,
    setNombrePago,
    actualizarListadoVencimientos,
    setActualizarListadoVencimientos,
    desactivarCliente,
  } = useClientes();

  const { setIdCliente } = useContable();

  useEffect(() => {
    const obtenerInfo = async () => {
      await obtenerClientes();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (actualizarListadoVencimientos) {
        await obtenerClientes();
        setActualizarListadoVencimientos(false);
      }
    };
    obtenerInfo();
  }, [actualizarListadoVencimientos]);

  const navigate = useNavigate();

  const { handleCargando } = useAuth();

  const handleClick = async (e, _id, usuarios) => {
    e.preventDefault();
    await setCuitEditar(_id);
    navigate("/clientes/perfil");
  };

  const handlePago = (e, nombre, _id) => {
    e.preventDefault();
    setNombrePago(nombre);
    setIdCliente(_id);
    handlePagoVencimiento();
  };

  const handleRecordarVencimiento = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Enviamos el recordatorio al cliente?",
      text: "Te llegara la informacion por copia al correo",
      icon: "question",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await recordarVencimiento(id);
        handleCargando();
      }
    });
  };

  const handleRecordarVencimientoWhatsapp = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Enviamos el recordatorio por Whatsapp al cliente?",
      text: "Esto enviara tambien un link de pago",
      icon: "question",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await recordarVencimientoWhatsapp(id);
        handleCargando();
      }
    });
  };

  const handleDesactivar = async (e, id, isActivo) => {
    e.preventDefault();
    Swal.fire({
      title: "Seguro queres desactivar al cliente?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await desactivarCliente({
          id: id,
          isActivo: isActivo,
        });
        setActualizarListadoVencimientos(true);
        handleCargando();
      }
    });
  };

  return (
    <>
      <div className="mb-4 mt-8 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Typography className="ml-4 font-bold">
          Proximos Vencimientos
        </Typography>
        <ToastContainer pauseOnFocusLoss={false} />
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0 text-center">
            <div className="max-h-[78vh] overflow-y-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead className="sticky top-0 bg-blue-50">
                  <tr>
                    {["Cliente", "Vencimiento", "Mail Factura", "Accion"].map(
                      (el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 px-6 py-3 text-center"
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
                    .sort(
                      (a, b) =>
                        new Date(a.fechaVencimiento) -
                        new Date(b.fechaVencimiento)
                    ) // ordenar por fecha de vencimiento
                    .map(
                      (
                        {
                          _id,
                          nombre,
                          fechaVencimiento,
                          mailFactura,
                          usuarios,
                          isActivo,
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
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  color={
                                    new Date(fechaVencimiento) < new Date()
                                      ? "red"
                                      : "blue-gray"
                                  }
                                  className="font-bold"
                                >
                                  {nombre}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  color={
                                    new Date(fechaVencimiento) < new Date()
                                      ? "red"
                                      : "blue-gray"
                                  }
                                  className="font-bold"
                                >
                                  {formatearFecha(fechaVencimiento)}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  color={
                                    new Date(fechaVencimiento) < new Date()
                                      ? "red"
                                      : "blue-gray"
                                  }
                                  className="font-bold"
                                >
                                  {mailFactura}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                {new Date(fechaVencimiento).getTime() <
                                Date.now() ? (
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="icon icon-tabler icon-tabler-mail-filled text-blue-800 hover:cursor-pointer"
                                      width="30"
                                      height="30"
                                      viewBox="0 0 24 24"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      fill="none"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      onClick={(e) =>
                                        handleRecordarVencimiento(e, _id)
                                      }
                                    >
                                      <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                      />
                                      <path
                                        d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z"
                                        stroke-width="0"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z"
                                        stroke-width="0"
                                        fill="currentColor"
                                      />
                                    </svg>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="icon icon-tabler icon-tabler-brand-whatsapp text-green-600 hover:cursor-pointer"
                                      width="30"
                                      height="30"
                                      viewBox="0 0 24 24"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      fill="none"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      onClick={(e) =>
                                        handleRecordarVencimientoWhatsapp(
                                          e,
                                          _id
                                        )
                                      }
                                    >
                                      <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                      />
                                      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                                      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                                    </svg>
                                  </>
                                ) : null}

                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-coin hover:cursor-pointer"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  stroke-width="2"
                                  stroke="currentColor"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  onClick={(e) => handlePago(e, nombre, _id)}
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                  <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" />
                                  <path d="M12 7v10" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-trash-x-filled text-red-400 hover:cursor-pointer"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  stroke-width="2"
                                  stroke="currentColor"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  onClick={(e) =>
                                    handleDesactivar(e, _id, isActivo)
                                  }
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path
                                    d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                                    stroke-width="0"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                                    stroke-width="0"
                                    fill="currentColor"
                                  />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-eye hover:cursor-pointer"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  stroke-width="2"
                                  stroke="currentColor"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  onClick={(e) => handleClick(e, _id, usuarios)}
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                </svg>
                              </div>
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
        <Cargando />
        {modalPagoListado ? <ModalNuevoPagoListadoVencimiento /> : null}
      </div>
    </>
  );
};

export default ListadodeProximosVencimientos;
