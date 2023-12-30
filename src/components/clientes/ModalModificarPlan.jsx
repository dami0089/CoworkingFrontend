import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useClientes from "@/hooks/useClientes";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";

const ModalModificarPlan = () => {
  const {
    handleModalModificarPlan,
    modalModificarPlan,
    handleCloseModalModificarPlan,
    modificarPrecioPlan,
    modificarNombrePlan,
    modificarHorasSalas,
    modificarDescripcionPlan,
    idModificarPlan,
    setModificarPrecioPlan,
    setModificarNombrePlan,
    setModificarHorasSalas,
    setModificarDescripcionPlan,
    setIdModificarPlan,
    editarPlan,
    actualizarListadoPLanes,
    setActualizarListadoPLanes,
    eliminarPLan,
  } = useClientes();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        modificarNombrePlan,
        modificarDescripcionPlan,
        modificarHorasSalas,
        modificarPrecioPlan,
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

    await editarPlan({
      id: idModificarPlan,
      nombre: modificarNombrePlan,
      descripcion: modificarDescripcionPlan,
      horasSalas: modificarHorasSalas,
      precio: modificarPrecioPlan,
    });

    handleModalModificarPlan();
    setActualizarListadoPLanes(true);
  };

  const deletePlan = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Seguro queres borrar este plan?",
      text: "Esta accion es irrecuperable",
      icon: "question",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarPLan(idModificarPlan);
        setActualizarListadoPLanes(true);
        handleModalModificarPlan();
      }
    });
  };

  return (
    <Transition.Root show={modalModificarPlan} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalModificarPlan}
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
                  onClick={handleCloseModalModificarPlan}
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
                    Modificar Plan
                  </Dialog.Title>

                  <form className="mx-2 my-2" onSubmit={handleSubmit}>
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
                        value={modificarNombrePlan}
                        onChange={(e) => setModificarNombrePlan(e.target.value)}
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
                        value={modificarDescripcionPlan}
                        onChange={(e) =>
                          setModificarDescripcionPlan(e.target.value)
                        }
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
                        value={modificarHorasSalas}
                        onChange={(e) => setModificarHorasSalas(e.target.value)}
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
                        value={modificarPrecioPlan}
                        onChange={(e) => setModificarPrecioPlan(e.target.value)}
                      />
                    </div>
                  </form>
                  <Button className="mb-4 w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300">
                    Guardar Cambios
                  </Button>
                  <Button
                    className="w-full cursor-pointer rounded bg-red-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-red-300"
                    onClick={(e) => deletePlan(e)}
                  >
                    Eliminar Plan
                  </Button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalModificarPlan;
