import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useClientes from "@/hooks/useClientes";
import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from "@material-tailwind/react";
import clienteAxios from "@/configs/clinteAxios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

const ModalEliminarUsuario = () => {
  const {
    idUsuarioModificar,
    emailUsuario,
    eliminarUser,
    setPlanes,
    setEmailUsuario,

    setNombreUsuario,

    setApellidoUsuario,

    setCeluUsuario,
    setDniUsuario,
    handleModalEditarUsuario,
    handleEliminarUsuario,
    modalEliminarUsuario,
  } = useClientes();

  const [emailVerificar, setEmailFerificar] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(emailVerificar);
    console.log(emailUsuario);

    if ([emailVerificar].includes("")) {
      toast("⚠️ Escriba el mail para verificar", {
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

    if (emailVerificar !== emailUsuario) {
      console.log("entro al if");
      toast("⚠️ Los emails no coinciden", {
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

    Swal.fire({
      title: "Seguro queres borrar al usuario?",
      text: "Esta accion es irrecuperable",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarUser(idUsuarioModificar);
        setPlanes(""),
          setEmailUsuario(""),
          setNombreUsuario(""),
          setApellidoUsuario(""),
          setCeluUsuario(""),
          setDniUsuario(""),
          handleEliminarUsuario();
        handleModalEditarUsuario();
      }
    });

    // nuevoPlan({
    //   nombre: nombrePlan,
    //   descripcion: descripcionPlan,
    //   horasSalas: horasSalas,
    //   precio: precioPlan,
    // });
  };

  return (
    <Transition.Root show={modalEliminarUsuario} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleEliminarUsuario}
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
                  onClick={handleEliminarUsuario}
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
                    Eliminar Usuario
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <div className="mb-1 mt-5">
                      <label
                        className=" text-sm font-bold uppercase text-gray-700"
                        htmlFor="nombre"
                      >
                        <div className="text-center align-middle">
                          <div className="font-bold text-black">
                            Para eliminar tipee el mail del usuario:
                          </div>
                          <div className="italic text-red-500">
                            {emailUsuario}
                          </div>
                        </div>
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        placeholder="Ingrese mail"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={emailVerificar}
                        onChange={(e) => setEmailFerificar(e.target.value)}
                      />
                    </div>

                    <input
                      type="submit"
                      className="mt-5 w-full cursor-pointer rounded bg-red-500 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-red-300"
                      value={"Eliminar"}
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

export default ModalEliminarUsuario;
