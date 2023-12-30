import {
  ArrowPathIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  EyeIcon,
  FunnelIcon,
  HomeModernIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";
import ModalEditarMovimientos from "./ModalEditarMovimientos";
import useContable from "@/hooks/useContable";
import { formatearFecha } from "@/helpers/formatearFecha";
import { StatisticsCard } from "@/widgets/cards";
import { ToastContainer } from "react-toastify";
import ModalFiltrarListados from "./ModalFiltrarListados";
import Cargando from "../deTodos/Cargando";

const ListadoCaja = () => {
  const {
    movimientos,
    handleModalEditarMovimiento,
    obtenerMovimientos,
    modalEditarMovimiento,
    renderMovimiento,
    setRenderMovimiento,
    setIdMovimiento,
    setEntidad,
    setDescripcion,
    setPrecioNeto,
    setTipo,
    setIdCliente,
    setIdProveedor,
    setEntidadFiltrar,
    modalFiltrar,
    handleFiltro,
    dataDashEntidad,
    obtenerDashEntidad,
  } = useContable();

  const [totalIngresos, setTotalIngresos] = useState("");
  const [totalGastos, setTotalGastos] = useState("");
  const [totalDisponible, setTotalDisponible] = useState("");
  const [calculoTotal, setCalculoTotal] = useState(false);

  const handleClick = (
    e,
    _id,
    entidad,
    tipo,
    cliente,
    proveedor,
    numeroFactura,
    descripcion,
    precioNeto
  ) => {
    setIdMovimiento(_id);
    setTipo(tipo);
    setEntidad(entidad);
    setIdCliente(cliente);
    setIdProveedor(proveedor);
    setDescripcion(descripcion);
    setPrecioNeto(precioNeto);
    handleModalEditarMovimiento();
  };

  useEffect(() => {
    const traerInfo = async () => {
      await obtenerMovimientos("Efectivo");
    };
    traerInfo();
  }, []);

  useEffect(() => {
    const traerInfo = async () => {
      await obtenerDashEntidad("Efectivo");
    };
    traerInfo();
  }, []);

  useEffect(() => {
    const traerInfo = async () => {
      if (renderMovimiento) {
        await obtenerDashEntidad("Efectivo");
        setRenderMovimiento(false);
      }
    };
    traerInfo();
  }, [renderMovimiento]);

  useEffect(() => {
    const traerInfo = async () => {
      if (renderMovimiento) {
        await obtenerMovimientos("Efectivo");
        setRenderMovimiento(false);
      }
    };
    traerInfo();
  }, [renderMovimiento]);

  function parseDecimal(str) {
    if (!str) return 0; // Si str es null, undefined o una cadena vacía, devuelve 0
    return parseFloat(str.replace(",", "."));
  }

  const handleF = (e) => {
    e.preventDefault();
    setEntidadFiltrar("Efectivo");
    handleFiltro();
  };

  return (
    <>
      <div className="mt-12  grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsCard
          title="Total Gastado Efectivo"
          color="blue"
          icon={<ArrowTrendingDownIcon />}
          footer={
            <Typography className="text-center font-normal text-blue-gray-600">
              <strong className="text-red-500">
                $ {dataDashEntidad.gastado ? dataDashEntidad.gastado : "-"}{" "}
              </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Total Ingresos Efectivo"
          color="blue"
          icon={<ArrowTrendingUpIcon />}
          footer={
            <Typography className="text-center font-normal text-blue-gray-600">
              <strong className="text-green-500">
                $ {dataDashEntidad.ingresos ? dataDashEntidad.ingresos : "-"}{" "}
              </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Disponible Efectivo"
          color="green"
          icon={<HomeModernIcon />}
          footer={
            <Typography className="text-center font-normal text-blue-gray-600">
              <strong className=" text-blue-500">
                ${" "}
                {dataDashEntidad.disponible ? dataDashEntidad.disponible : "-"}{" "}
              </strong>
            </Typography>
          }
        />
      </div>
      <ToastContainer pauseOnFocusLoss={false} />

      <div className=" mr-4 mt-8 flex justify-between">
        <Typography className="ml-4 font-bold">Listado Caja</Typography>
        <div className="flex">
          <ArrowPathIcon className="mr-4 h-8 w-8 hover:cursor-pointer" />
          <FunnelIcon
            className="h-8 w-8 text-gray-700 hover:cursor-pointer hover:text-gray-400"
            onClick={(e) => handleF(e)}
          />
        </div>
      </div>
      <div className="mb-4 mt-8 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0 text-center">
            <div className="max-h-[78vh] overflow-y-auto">
              <table className=" w-full min-w-[640px] table-auto text-center">
                <thead className="sticky top-0 bg-blue-50">
                  <tr>
                    {[
                      "Fecha",
                      "Nombre",
                      "Descripcion",
                      "Gastos",
                      "Ingresos",
                      "Editar",
                    ].map((el) => (
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
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {movimientos.map(
                    (
                      {
                        _id,
                        fecha,
                        tipo,
                        descripcion,
                        precioNeto,
                        nombreCliente,
                        nombreProveedor,
                        entidad,
                        cliente,
                        proveedor,
                        numeroFactura,
                      },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === projectsTableData.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <>
                          {entidad == "Efectivo" ? (
                            <>
                              <tr key={_id}>
                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
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
                                  <Typography
                                    variant="small"
                                    className="text-xs font-medium text-blue-gray-600"
                                  >
                                    {tipo === "Ingreso" ? nombreCliente : ""}{" "}
                                    {tipo === "Gasto" ? nombreProveedor : ""}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="text-xs font-medium text-blue-gray-600"
                                  >
                                    {descripcion.length > 20
                                      ? descripcion.slice(0, 20) + "..."
                                      : descripcion}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="text-xs font-medium text-blue-gray-600"
                                  >
                                    {tipo == "Gasto" ? "$" : ""}{" "}
                                    {tipo == "Gasto" ? precioNeto : ""}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="text-xs font-medium text-blue-gray-600"
                                  >
                                    {tipo == "Ingreso" ? "$" : ""}{" "}
                                    {tipo == "Ingreso" ? precioNeto : ""}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <EyeIcon
                                      className="h-8 w-8 hover:cursor-pointer"
                                      onClick={(e) =>
                                        handleClick(
                                          e,
                                          _id,
                                          entidad,
                                          tipo,
                                          cliente,
                                          proveedor,
                                          numeroFactura,
                                          descripcion,
                                          precioNeto
                                        )
                                      }
                                    />
                                  </div>
                                </td>
                              </tr>
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
        {modalEditarMovimiento ? <ModalEditarMovimientos /> : ""}
        {modalFiltrar ? <ModalFiltrarListados /> : null}
        <Cargando />
      </div>
    </>
  );
};

export default ListadoCaja;
