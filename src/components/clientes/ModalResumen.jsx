import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useClientes from "@/hooks/useClientes";
import { ToastContainer, toast } from "react-toastify";
import {
  ArrowLeftCircleIcon,
  BuildingOffice2Icon,
  ClipboardDocumentIcon,
  ComputerDesktopIcon,
  EnvelopeIcon,
  IdentificationIcon,
  InboxArrowDownIcon,
  InboxIcon,
  InboxStackIcon,
  PaperClipIcon,
  PhoneArrowDownLeftIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const ModalResumen = () => {
  const {
    cantidad,
    nombre,
    cuit,
    tipo,
    fechaVencimiento,
    emailFactura,
    handleBack,
    nombreUsuario,
    apellidoUsuario,
    dniUsuario,
    emailUsuario,
    celuUsuario,
    handleClose,
    modalResumen,
    handleModalResumen,
    planes,
    handleClose3,
    handleBack2,
    nuevoCliente,
    guardarUsuarios,
    domicilio,
    setNombreUsuario,
    setApellidoUsuario,
    setCheck,
    setCeluUsuario,
    setDniUsuario,
    setEmailUsuario,
  } = useClientes();

  //Una vez mostrado por pantalla todo el resumen de la informacion, se procede a enviar al provider toda la info para ser guardada en la base de datos.
  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO: AGregar la validacion de usuarios
    await nuevoCliente({
      tipo: tipo,
      nombre: nombre,
      cuit: cuit,
      domicilio: domicilio,
      mailFactura: emailFactura,
      fechaVencimiento: fechaVencimiento,
      planes: planes,
    });
    await guardarUsuarios(
      nombreUsuario,
      apellidoUsuario,
      dniUsuario,
      emailUsuario,
      celuUsuario,
      cuit,
      planes
    );
    handleModalResumen();
    setNombreUsuario("");
    setApellidoUsuario("");
    setEmailUsuario("");
    setCheck(false);
    setCeluUsuario("");
    setDniUsuario("");
  };

  return (
    <Transition.Root show={modalResumen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto "
        onClose={handleModalResumen}
      >
        <div className="flex  min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
              <div className="absolute  top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleClose3}
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

              <div className="sm:flex sm:items-start ">
                <div className="absolute top-0 right-8 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="bg-red rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleBack2}
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
                <div className="mt-3  w-full text-center sm:mt-0 sm:ml-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6  text-gray-700"
                  >
                    Resumen Ficha de Cliente
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <>
                      {/* <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-black"
                          htmlFor="nombre"
                        >
                          Tipo
                        </label>
                        <p>{tipo}</p>
                      </div>
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-black"
                          htmlFor="nombre"
                        >
                          {tipo == "A" ? "Razon Social" : "Nombre"}
                        </label>
                        <p>{nombre}</p>
                      </div>
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-black"
                          htmlFor="nombre"
                        >
                          {tipo == "A" ? "CUIT" : "DNI"}
                        </label>
                        <p>{cuit}</p>
                      </div>
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-black"
                          htmlFor="nombre"
                        >
                          Email Facturacion
                        </label>
                        <p>{emailFactura}</p>
                      </div>
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-black"
                          htmlFor="nombre"
                        >
                          Proxima fecha de vencimiento
                        </label>
                        <p>{fechaVencimiento}</p>
                      </div>
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-black"
                          htmlFor="nombre"
                        >
                          Cantidad de Planes
                        </label>
                        <p>{cantidad}</p>
                      </div>
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-black"
                          htmlFor="nombre"
                        >
                          Plan Seleccionado
                        </label>
                        <p>{planes}</p>
                      </div>

                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-black"
                          htmlFor="nombre"
                        >
                          Nombre y apellido
                        </label>
                        <p>
                          {nombreUsuario} {apellidoUsuario}
                        </p>
                      </div>
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-black"
                          htmlFor="nombre"
                        >
                          DNI usuario
                        </label>
                        <p>{cuit}</p>
                      </div>
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-black"
                          htmlFor="nombre"
                        >
                          Email Usuario
                        </label>
                        <p>{emailUsuario}</p>
                      </div>
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-black"
                          htmlFor="nombre"
                        >
                          Celular Usuario
                        </label>
                        <p>{celuUsuario}</p>
                      </div> */}
                      <div class="flex items-center justify-center">
                        <div class=" mt-5 flex max-w-md grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                          <div class=" relative my-4 w-64 rounded-3xl bg-white py-6 px-6 shadow-xl">
                            <div class=" absolute left-4 -top-6 flex items-center rounded-full bg-pink-500 py-4 px-4 text-white shadow-xl">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <ClipboardDocumentIcon />
                              </svg>
                            </div>
                            <div class="mt-8">
                              <p class="my-2 text-xl font-semibold">Cliente</p>
                              <div class="flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <BuildingOffice2Icon />
                                  {/* <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  /> */}
                                  {/* <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  /> */}
                                </svg>
                                <p>{nombre}</p>
                              </div>
                              <div class="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <PaperClipIcon />
                                </svg>
                                <p>{cuit}</p>
                              </div>
                              <div class="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <EnvelopeIcon />
                                </svg>
                                <p>{domicilio}</p>
                              </div>
                              <div class="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <InboxIcon />
                                </svg>
                                <p>{emailFactura}</p>
                              </div>

                              <div class="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <ComputerDesktopIcon />
                                </svg>
                                <p>{planes}</p>
                              </div>

                              <div class="border-t-2"></div>

                              <div class="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <UserIcon />
                                </svg>
                                <p>{nombreUsuario}</p>
                              </div>
                              <div class="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <InboxArrowDownIcon />
                                </svg>
                                <p>{emailUsuario}</p>
                              </div>
                              <div class="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <PhoneArrowDownLeftIcon />
                                </svg>
                                <p>{celuUsuario}</p>
                              </div>
                              {/* <div class="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <Pho />
                                </svg>
                                <p>{celuUsuario}</p>
                              </div> */}
                            </div>
                          </div>

                          {/* <div class="relative my-4 w-64 rounded-3xl bg-white py-6 px-6 shadow-xl">
                            <div class=" absolute left-4 -top-6 flex items-center rounded-full bg-green-500 py-4 px-4 text-white shadow-xl">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div class="mt-8">
                              <p class="my-2 text-xl font-semibold">
                                Web Design
                              </p>
                              <div class="flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                <p>Core UI Team</p>
                              </div>
                              <div class="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <p>3 Weeks Left</p>
                              </div>
                              <div class="border-t-2 "></div>

                              <div class="flex justify-between">
                                <div class="my-2">
                                  <p class="mb-2 text-base font-semibold">
                                    Team Member
                                  </p>
                                  <div class="flex space-x-2">
                                    <img
                                      src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                      class="h-6 w-6 rounded-full"
                                    />
                                  </div>
                                </div>
                                <div class="my-2">
                                  <p class="mb-2 text-base font-semibold">
                                    Progress
                                  </p>
                                  <div class="text-base font-semibold text-gray-400">
                                    <p>76%</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <input
                        type="submit"
                        className="w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                        value={
                          cantidad == "1"
                            ? "Guardar cliente y Crear usuario"
                            : "Guardar cliente y Crear usuarios"
                        }
                      />
                    </>
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

export default ModalResumen;
