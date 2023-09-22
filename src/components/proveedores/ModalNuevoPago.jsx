import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useContable from "@/hooks/useContable";
import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from "@material-tailwind/react";
import clienteAxios from "@/configs/clinteAxios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import useClientes from "@/hooks/useClientes";
import useProveedores from "@/hooks/useProveedores";

const TIPO = ["Ingreso", "Gasto"];
const ENTIDAD = ["Banco", "MP", "Efectivo", "Cripto"];

const ModalNuevoPago = () => {
  const {
    entidad,
    setEntidad,
    tipo,
    setTipo,
    gasto,
    nuevoGasto,
    cambiarEstado,
    gastoId,
  } = useContable();

  const {
    proveedores,
    handleModalNuevoPago,
    modalNuevoPago,
    proveedorPago,
    setProveedorPago,
    numeroFacturaPago,
    setNumeroFacturaPago,
    descripcionPago,
    setDescripcionPago,
    precioBrutoPago,
    setPrecioBrutoPago,
    ivaPago,
    setIvaPago,
    precioNetoPago,
    setPrecioNetoPago,
    tipoComprobantePago,
    setTipoComprobantePago,
    idProveedorPago,
    idFacturaAPagar,
    setIdFacturaAPagar,
    obtenerProveedores,
  } = useProveedores();

  useEffect(() => {
    const traerData = async () => {
      await obtenerProveedores();
    };
    traerData();
  }, []);

  const { clientes } = useClientes();

  useEffect(() => {
    setTipo("Gasto");
  }, []);

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      tipoComprobantePago === "A" &&
      [
        tipoComprobantePago,
        entidad,
        idProveedorPago,
        numeroFacturaPago,
        descripcionPago,
        precioBrutoPago,
        ivaPago,
        precioNetoPago,
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
    if (
      tipoComprobantePago != "A" &&
      [
        tipoComprobantePago,
        entidad,
        idProveedorPago,
        numeroFacturaPago,
        descripcionPago,
        precioNetoPago,
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

    if (tipoComprobantePago === "A") {
      await nuevoGasto({
        entidad: entidad,
        tipo: tipo,
        numeroFactura: numeroFacturaPago,
        descripcion: descripcionPago,
        precioBruto: precioBrutoPago,
        iva: setIvaPago,
        precioNeto: precioNetoPago,
        proveedor: idProveedorPago,
      });
      setTimeout(() => {
        handleModalNuevoPago();
      }, 600);
    } else {
      await nuevoGasto({
        entidad: entidad,
        tipo: tipo,
        numeroFactura: numeroFacturaPago,
        descripcion: descripcionPago,
        precioNeto: precioNetoPago,
        proveedor: idProveedorPago,
      });
      setTimeout(() => {
        handleModalNuevoPago();
      }, 600);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      cambiarEstado(idFacturaAPagar);
    }, 2000);
  }, [gastoId]);

  return (
    <Transition.Root show={modalNuevoPago} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalNuevoPago}
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
                  onClick={handleModalNuevoPago}
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
                    Nuevo Pago
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="cantidad"
                      >
                        Entidad
                      </label>
                      <select
                        id="cantidad"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={entidad}
                        onChange={(e) => setEntidad(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>
                        {ENTIDAD.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="numero"
                      >
                        Tipo
                      </label>
                      <input
                        id="numero"
                        type="text"
                        placeholder="Numero de Factura"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={tipo}
                        disabled
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="proveedor"
                      >
                        Proveedor
                      </label>
                      <input
                        id="proveedor"
                        type="text"
                        placeholder="Proveedor"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={proveedorPago}
                        disabled
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="numero"
                      >
                        Numero de Factura
                      </label>
                      <input
                        id="numero"
                        type="text"
                        placeholder="Numero de Factura"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={numeroFacturaPago}
                        disabled
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="descripcion"
                      >
                        Descripcion
                      </label>
                      <input
                        id="descripcion"
                        type="text"
                        placeholder="Descripcion"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={descripcionPago}
                        disabled
                      />
                    </div>
                    {tipoComprobantePago == "A" ? (
                      <>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="precioB"
                          >
                            Precio Bruto
                          </label>
                          <input
                            id="precioB"
                            type="text"
                            placeholder="Precio Bruto"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={precioBrutoPago}
                            disabled
                          />
                        </div>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="domicilio"
                          >
                            IVA
                          </label>
                          <input
                            id="domicilio"
                            type="text"
                            disabled={true}
                            placeholder="IVA"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={ivaPago}
                          />
                        </div>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="preciof"
                          >
                            Precio Final
                          </label>
                          <input
                            id="preciof"
                            type="text"
                            disabled={true}
                            placeholder="Precio Final"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={precioNetoPago}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="preciof"
                        >
                          Precio Final
                        </label>
                        <input
                          id="preciof"
                          type="text"
                          disabled={true}
                          placeholder="Precio Final"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={precioNetoPago}
                          // onChange={(e) => handleIVA(e.target.value)}
                        />
                      </div>
                    )}

                    <input
                      type="submit"
                      className="w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Registrar Pago"}
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

export default ModalNuevoPago;
