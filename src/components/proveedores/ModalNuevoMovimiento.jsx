import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useContable from "@/hooks/useContable";
import { ToastContainer, toast } from "react-toastify";
import useClientes from "@/hooks/useClientes";
import useProveedores from "@/hooks/useProveedores";
import { input } from "@material-tailwind/react";

const TIPO = ["Ingreso", "Gasto"];
const ENTIDAD = ["Banco", "MP", "Efectivo", "Cripto"];

const ModalNuevoMovimiento = () => {
  const {
    handleModalNuevoMovimiento,
    modalNuevoMovimiento,
    handleCloseModalMovimientos,
    entidad,
    setEntidad,
    tipo,
    setTipo,
    idProveedor,
    setIdProveedor,
    idCliente,
    setIdCliente,
    numeroFactura,
    setNumeroFactura,
    descripcion,
    setDescripcion,
    precioBruto,
    setPrecioBruto,
    iva,
    setIva,
    precioNeto,
    setPrecioNeto,
    nuevoGasto,
    renderMovimiento,
    setRenderMovimiento,
  } = useContable();

  useEffect(() => {
    const traerData = async () => {
      await obtenerProveedores();
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      await obtenerClientes();
    };
    traerData();
  }, []);

  const { proveedores, obtenerProveedores } = useProveedores();

  const { clientes, obtenerClientes } = useClientes();

  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [nombreCliente, setNombreCliente] = useState("");

  const [proveedoresFiltrados, setProveedoresFiltrados] = useState([]);
  const [nombreProveedor, setNombreProveedor] = useState("");

  const handleNombreClienteChange = (e) => {
    const inputValue = e.target.value;
    setNombreCliente(inputValue);

    // Filtrar los clientes basados en el nombre ingresado
    const coincidencias = clientes.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );

    setClientesFiltrados(coincidencias);
  };

  const handleNombreProveedorChange = (e) => {
    const inputValue = e.target.value;

    // Filtrar los clientes basados en el nombre ingresado
    const coincidencias = proveedores.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log(coincidencias);
    setProveedoresFiltrados(coincidencias);
  };

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        tipo,
        idCliente || idProveedor,
        numeroFactura,
        descripcion,
        precioBruto,
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
    if (tipo == "Ingreso") {
      await nuevoGasto({
        entidad: entidad,
        tipo: tipo,
        numeroFactura: numeroFactura,
        descripcion: descripcion,
        precioBruto: precioBruto,
        iva: iva,
        precioNeto: precioNeto,
        cliente: idCliente,
      });
      setRenderMovimiento(true);
      setTimeout(() => {
        handleModalNuevoMovimiento();
      }, 600);
    } else {
      await nuevoGasto({
        entidad: entidad,
        tipo: tipo,
        numeroFactura: numeroFactura,
        descripcion: descripcion,
        precioBruto: precioBruto,
        iva: iva,
        precioNeto: precioNeto,
        proveedor: idProveedor,
      });
      setRenderMovimiento(true);
      setTimeout(() => {
        handleModalNuevoMovimiento();
      }, 600);
    }
  };

  useEffect(() => {
    let preciob = parseFloat(precioBruto);
    let valorIVA = (preciob * 21) / 100;
    let PrecioN = parseFloat((preciob + valorIVA).toFixed(2));

    setIva(valorIVA.toFixed(2));
    setPrecioNeto(PrecioN);
  }, [precioBruto]);

  return (
    <Transition.Root show={modalNuevoMovimiento} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalNuevoMovimiento}
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
                  onClick={handleCloseModalMovimientos}
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
                    Nuevo Movimiento
                  </Dialog.Title>

                  <form className="mx-2 my-2" onSubmit={handleSubmit}>
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

                    <div className="mb-2">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="tipo"
                      >
                        Tipo
                      </label>
                      <select
                        id="tipo"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
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
                        htmlFor="cliente"
                      >
                        {tipo === "Ingreso"
                          ? "Seleccione el Cliente"
                          : tipo === "Gasto"
                          ? "Seleccione el Proveedor"
                          : "Primero Seleccione el tipo"}
                      </label>

                      {tipo === "Ingreso" ? (
                        <>
                          <input
                            id="cliente"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            type="text"
                            autoComplete="off"
                            placeholder="Ingresa el cliente"
                            value={nombreCliente}
                            onChange={handleNombreClienteChange}
                          />

                          {clientesFiltrados.length > 0 && (
                            <div className="mt-2 max-h-40 overflow-y-auto rounded-md bg-gray-100">
                              <ul className="border border-gray-300 px-2 py-1">
                                {clientesFiltrados.map((cliente) => (
                                  <li
                                    key={cliente._id}
                                    className="cursor-pointer py-1 hover:bg-gray-200"
                                    onClick={() => {
                                      setNombreCliente(cliente.nombre);
                                      setIdCliente(cliente._id);
                                      setClientesFiltrados([]);
                                    }}
                                  >
                                    {cliente.nombre}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      ) : tipo === "Gasto" ? (
                        <>
                          <input
                            id="cliente"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            type="text"
                            autoComplete="off"
                            placeholder="Ingresa el Proveedor"
                            value={nombreProveedor}
                            onChange={handleNombreProveedorChange}
                          />

                          {proveedoresFiltrados.length > 0 && (
                            <div className="mt-2 max-h-40 overflow-y-auto rounded-md bg-gray-100">
                              <ul className="border border-gray-300 px-2 py-1">
                                {proveedoresFiltrados.map((proveedor) => (
                                  <li
                                    key={proveedor._id}
                                    className="cursor-pointer py-1 hover:bg-gray-200"
                                    onClick={() => {
                                      setNombreProveedor(proveedor.nombre);
                                      setIdProveedor(proveedor._id);
                                      setProveedoresFiltrados([]);
                                    }}
                                  >
                                    {proveedor.nombre}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      ) : (
                        <select
                          id="seleccione"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          disabled={true}
                          value=""
                        >
                          <option value="">
                            --Primero elija el tipo de movimiento--
                          </option>

                          <option></option>
                        </select>
                      )}
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
                        value={numeroFactura}
                        onChange={(e) => setNumeroFactura(e.target.value)}
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
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>
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
                        value={precioBruto}
                        onChange={(e) => setPrecioBruto(e.target.value)}
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
                        value={precioBruto == "" ? "" : iva}
                        onChange={(e) => handleIVA(e.target.value)}
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
                        value={precioBruto == "" ? "" : precioNeto}
                        // onChange={(e) => handleIVA(e.target.value)}
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

export default ModalNuevoMovimiento;
