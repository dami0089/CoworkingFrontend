import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useProveedores from "../../hooks/useProveedores";

import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from "@material-tailwind/react";
import clienteAxios from "@/configs/clinteAxios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const TIPO = ["A", "B", "C"];

const ModalNuevoProveedor = () => {
  const {
    modalNuevoProveedor,
    handleModalNuevoProveedor,
    onClose,
    tipoProveedor,
    setTipoProveedor,
    nombreProveedor,
    setNombreProveedor,
    domicilioProveedor,
    setDomicilioProveedor,
    emailProveedor,
    setEmailProveedor,
    cuitProveedor,
    setCuitProveedor,
    guardarProveedor,
    averiguarData,
    telefonoProveedor,
    setTelefonoProveedor,
  } = useProveedores();

  //Consultamos la base de datos para saber si el proveedor ya esta registrado antes. Si no esta registrado cierra el modal y pasa al modal2
  const consultarBase = async (cuit) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post(`/proveedores/comprobar`, { cuit }, config);

      guardarProveedor({
        tipo: tipoProveedor,
        nombre: nombreProveedor,
        cuit: cuitProveedor,
        domicilio: domicilioProveedor,
        email: emailProveedor,
        telefono: telefonoProveedor,
      });
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

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombreProveedor].includes("")) {
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
    // consultarAfip(cuitProveedor);
    await consultarBase(cuitProveedor);
  };

  return (
    <Transition.Root show={modalNuevoProveedor} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalNuevoProveedor}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
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
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={onClose}
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
                <div className="mt-3 w-full text-center sm:ml-0 sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Nuevo Proveedor
                  </Dialog.Title>

                  <form className="mx-2 my-2" onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="plan"
                      >
                        Tipo
                      </label>
                      <select
                        id="plan"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={tipoProveedor}
                        onChange={(e) => setTipoProveedor(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>
                        {TIPO.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="razon"
                      >
                        Razon Social
                      </label>
                      <input
                        id="razon"
                        type="text"
                        placeholder={"Razon Social"}
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={nombreProveedor}
                        onChange={(e) => setNombreProveedor(e.target.value)}
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="cuit"
                      >
                        Cuit
                      </label>
                      <input
                        id="cuit"
                        type="text"
                        placeholder={"Cuit"}
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={cuitProveedor}
                        onChange={(e) => setCuitProveedor(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="domicilio"
                      >
                        Domicilio
                      </label>
                      <input
                        id="domicilio"
                        type="text"
                        placeholder="Domicilio"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={domicilioProveedor}
                        onChange={(e) => setDomicilioProveedor(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
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
                        value={emailProveedor}
                        onChange={(e) => setEmailProveedor(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="telefono"
                      >
                        Telefono
                      </label>
                      <input
                        id="telefono"
                        type="text"
                        placeholder="Telefono"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={telefonoProveedor}
                        onChange={(e) => setTelefonoProveedor(e.target.value)}
                      />
                    </div>

                    <input
                      type="submit"
                      className="w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Guardar"}
                    />
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

export default ModalNuevoProveedor;
