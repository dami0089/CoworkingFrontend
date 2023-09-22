import { Fragment, useState, useEffect, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useClientes from "@/hooks/useClientes";
import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from "@material-tailwind/react";
import clienteAxios from "@/configs/clinteAxios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const ModalNuevoCliente2 = () => {
  const {
    handleModalNuevoCliente2,
    modalNuevoCliente2,
    cantidad,
    nombre,
    cuit,
    tipo,
    planes,
    setPlanes,
    emailFactura,
    handleBack,
    nombreUsuario,
    setNombreUsuario,
    apellidoUsuario,
    setApellidoUsuario,
    dniUsuario,
    emailUsuario,
    setEmailUsuario,
    celuUsuario,
    setCeluUsuario,
    setDniUsuario,
    handleClose,
    handleModalResumen,
    mostrarPlanes,
    obtenerPlanes,
  } = useClientes();

  useEffect(() => {
    const mostrar = async () => {
      await obtenerPlanes();
    };
    mostrar();
  }, []);

  const [check, setCheck] = useState(false);

  //Este effect esta para cuando el cliente clickea en el check, se completen los campos automaticamente.
  useEffect(() => {
    const checkfunction = () => {
      if (check) {
        setNombreUsuario(nombre);
        setDniUsuario(cuit);
        setEmailUsuario(emailFactura);
      } else {
        setNombreUsuario("");
        setDniUsuario("");
        setEmailUsuario("");
      }
    };
    checkfunction();
  }, [check]);

  //consultamos la base con el email para saber si el cliente ya fue registrado con anterioridad
  const consultarBase = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/usuarios/comprobar`,
        { email },
        config
      );

      handleModalNuevoCliente2();
      handleModalResumen();
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //Comprobamos que todos los campos esten completos correctamente
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        nombreUsuario,
        apellidoUsuario,
        dniUsuario,
        emailUsuario,
        celuUsuario,
        planes,
      ].includes("")
    ) {
      toast("⚠️ Todos los campos son obligatorios", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    consultarBase(emailUsuario);
  };

  return (
    <Transition.Root show={modalNuevoCliente2} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalNuevoCliente2}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <ToastContainer pauseOnFocusLoss={false} />

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleClose}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="absolute top-0 right-8 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="bg-red rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleBack}
                  >
                    <ArrowLeftCircleIcon />
                    <span className="sr-only">Cerrar</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </button>
                </div>
                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Alta de planes
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    {cantidad != "1" ? (
                      ""
                    ) : (
                      <div className="-ml-2.5">
                        <Checkbox
                          label="Datos iguales a la factura"
                          value={check}
                          onChange={(e) => setCheck(!check)}
                        />
                      </div>
                    )}

                    {cantidad == "1" && check ? (
                      <>
                        <div className="mb-3">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="cantidad"
                          >
                            Selecciona Plan
                          </label>
                          <select
                            id="cantidad"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={planes}
                            onChange={(e) => setPlanes(e.target.value)}
                          >
                            <option value="">--Seleccionar--</option>
                            {mostrarPlanes.map((planes) => (
                              <option key={planes._id}>{planes.nombre}</option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="nombre"
                          >
                            Nombre del Usuario
                          </label>
                          <input
                            id="nombre"
                            type="text"
                            placeholder="Nombre"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                          />
                        </div>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="apellido"
                          >
                            Apellido del Usuario
                          </label>
                          <input
                            id="apellido"
                            type="text"
                            placeholder="Apellido"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={apellidoUsuario}
                            onChange={(e) => setApellidoUsuario(e.target.value)}
                          />
                        </div>
                        {tipo == "B" ? (
                          <div className="mb-1">
                            <label
                              className="text-sm font-bold uppercase text-gray-700"
                              htmlFor="dni"
                            >
                              DNI
                            </label>
                            <input
                              id="dni"
                              type="text"
                              placeholder="DNI"
                              className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                              value={dniUsuario}
                              onChange={(e) => setDniUsuario(e.target.value)}
                            />
                          </div>
                        ) : (
                          <div className="mb-1">
                            <label
                              className="text-sm font-bold uppercase text-gray-700"
                              htmlFor="dni"
                            >
                              DNI
                            </label>
                            <input
                              id="dni"
                              type="text"
                              placeholder="DNI"
                              className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                              value={dniUsuario}
                              onChange={(e) => setDniUsuario(e.target.value)}
                            />
                          </div>
                        )}
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={emailUsuario}
                            onChange={(e) => setEmailUsuario(e.target.value)}
                          />
                          <div className="mb-1">
                            <label
                              className="text-sm font-bold uppercase text-gray-700"
                              htmlFor="celu"
                            >
                              Celular o Telefono
                            </label>
                            <input
                              id="celu"
                              type="text"
                              placeholder="Celular"
                              className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                              value={celuUsuario}
                              onChange={(e) => setCeluUsuario(e.target.value)}
                            />
                          </div>
                        </div>
                        <input
                          type="submit"
                          className="w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                          value={"Guardar Usuario"}
                        />
                      </>
                    ) : (
                      <>
                        <div className="mb-3">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="cantidad"
                          >
                            Selecciona Plan
                          </label>
                          <select
                            id="cantidad"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={planes}
                            onChange={(e) => setPlanes(e.target.value)}
                          >
                            <option value="">--Seleccionar--</option>
                            {mostrarPlanes.map((plan) => (
                              <option key={plan._id}>{plan.nombre}</option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="nombre"
                          >
                            Nombre del Usuario
                          </label>
                          <input
                            id="nombre"
                            type="text"
                            placeholder="Nombre"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                          />
                        </div>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="apellido"
                          >
                            Apellido del Usuario
                          </label>
                          <input
                            id="apellido"
                            type="text"
                            placeholder="Apellido"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={apellidoUsuario}
                            onChange={(e) => setApellidoUsuario(e.target.value)}
                          />
                        </div>

                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="dni"
                          >
                            DNI
                          </label>
                          <input
                            id="dni"
                            type="text"
                            placeholder="DNI"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={dniUsuario}
                            onChange={(e) => setDniUsuario(e.target.value)}
                          />
                        </div>

                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={emailUsuario}
                            onChange={(e) => setEmailUsuario(e.target.value)}
                          />
                          <div className="mb-1">
                            <label
                              className="text-sm font-bold uppercase text-gray-700"
                              htmlFor="celu"
                            >
                              Celular o Telefono
                            </label>
                            <input
                              id="celu"
                              type="text"
                              placeholder="Celular"
                              className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                              value={celuUsuario}
                              onChange={(e) => setCeluUsuario(e.target.value)}
                            />
                          </div>
                          <input
                            type="submit"
                            className="w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                            value={
                              cantidad == "1"
                                ? "Guardar Usuario"
                                : "Siguiente Usuario"
                            }
                          />
                        </div>
                      </>
                    )}

                    {/* <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="razon"
                      >
                        {tipo === "A" || tipo === ""
                          ? "Razon Social"
                          : "Nombre"}
                      </label>
                      <input
                        id="razon"
                        type="text"
                        placeholder={
                          tipo === "A" || tipo === ""
                            ? "Razon Social"
                            : "Nombre"
                        }
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div> */}
                    {/* <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="cuit"
                      >
                        {tipo === "A" || tipo === "" ? "Cuit" : "Dni"}
                      </label>
                      <input
                        id="cuit"
                        type="text"
                        placeholder={
                          tipo === "A" || tipo === "" ? "Cuit" : "Dni"
                        }
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={cuit}
                        onChange={(e) => setCuit(e.target.value)}
                      />
                    </div> */}
                    {/* <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="email"
                      >
                        Email Facturacion
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Email "
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={emailFactura}
                        onChange={(e) => setEmailFactura(e.target.value)}
                      />
                    </div> */}
                    {/* <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="fecha-venc"
                      >
                        Fecha vencimiento del plan
                      </label>
                      <input
                        id="fecha-venc"
                        type="date"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={fechaVencimiento}
                        onChange={(e) => setFechaVencimiento(e.target.value)}
                      />
                    </div> */}
                    {/* <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="cantidad"
                      >
                        Cantidad de planes
                      </label>
                      <input
                        id="cantidad"
                        type="text"
                        placeholder="Cantidad "
                        className="mt-2 mb-4 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                      />
                    </div> */}
                    {/* {cantidad == 1 ? (
                      <div className="mb-2">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="plan"
                        >
                          Plan
                        </label>
                        <select
                          id="plan"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={planes}
                          onChange={(e) => setPlanes(e.target.value)}
                        >
                          <option value="">--Seleccionar--</option>
                          {PLAN.map((opcion) => (
                            <option key={opcion}>{opcion}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      ""
                    )} */}

                    {/* <input
                      type="submit"
                      className="w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Continuar"}
                    /> */}
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalNuevoCliente2;
