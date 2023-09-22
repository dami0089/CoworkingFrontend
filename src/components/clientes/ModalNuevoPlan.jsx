import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useClientes from "@/hooks/useClientes";
import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from "@material-tailwind/react";
import clienteAxios from "@/configs/clinteAxios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const ModalNuevoPlan = () => {
  const {
    handleModalNuevoPlan,
    modalNuevoPlan,
    handleCloseModalNuevoPlan,
    nombrePlan,
    setNombrePlan,
    descripcionPlan,
    setDescripcionPlan,
    horasSalas,
    setHorasSalas,
    precioPlan,
    setPrecioPlan,
    nuevoPlan,
  } = useClientes();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombrePlan, descripcionPlan, horasSalas, precioPlan].includes("")) {
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

    nuevoPlan({
      nombre: nombrePlan,
      descripcion: descripcionPlan,
      horasSalas: horasSalas,
      precio: precioPlan,
    });

    setTimeout(() => {
      handleModalNuevoPlan();
      setNombrePlan("");
      setDescripcionPlan("");
      setHorasSalas("");
      setPrecioPlan("");
    }, 1000);

    // validarCuit(cuit);
  };

  return (
    <Transition.Root show={modalNuevoPlan} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalNuevoPlan}
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
                  onClick={handleCloseModalNuevoPlan}
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
                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Nuevo Plan
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="nombre"
                      >
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre del plan"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={nombrePlan}
                        onChange={(e) => setNombrePlan(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="descripcion"
                      >
                        Descripcion
                      </label>
                      <textarea
                        id="descripcion"
                        type="text"
                        placeholder="Descripcion del plan "
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={descripcionPlan}
                        onChange={(e) => setDescripcionPlan(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="horas"
                      >
                        Horas de sala
                      </label>
                      <input
                        id="horas"
                        type="text"
                        placeholder="Horas"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={horasSalas}
                        onChange={(e) => setHorasSalas(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="precio"
                      >
                        Precio
                      </label>
                      <input
                        id="precio"
                        type="text"
                        placeholder="Precio del plan"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={precioPlan}
                        onChange={(e) => setPrecioPlan(e.target.value)}
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

export default ModalNuevoPlan;
