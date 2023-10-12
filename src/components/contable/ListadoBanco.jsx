import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";

import useContable from "@/hooks/useContable";
import { formatearFecha } from "@/helpers/formatearFecha";
import ModalEditarMovimientos from "./ModalEditarMovimientos";
import { StatisticsCard } from "@/widgets/cards";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";

const ListadoBanco = () => {
  const {
    movimientos,

    handleModalEditarMovimiento,
    obtenerMovimientos,
    setTipo,
    setEntidad,
    setIdMovimiento,
    setIdProveedor,
    setNumeroFactura,
    setDescripcion,
    setPrecioBruto,
    setIdCliente,

    modalEditarMovimiento,
    setPrecioNeto,
    renderMovimiento,
    setRenderMovimiento,
  } = useContable();

  const [totalIngresos, setTotalIngresos] = useState("");
  const [totalGastos, setTotalGastos] = useState("");
  const [totalDisponible, setTotalDisponible] = useState("");
  const [calculoTotal, setCalculoTotal] = useState(false);

  useEffect(() => {
    const traerInfo = async () => {
      await obtenerMovimientos();
    };
    traerInfo();
  }, []);

  useEffect(() => {
    const traerInfo = async () => {
      if (renderMovimiento) {
        await obtenerMovimientos();
        setRenderMovimiento(false);
      }
    };
    traerInfo();
  }, [renderMovimiento]);

  const handleClick = (
    e,
    _id,
    entidad,
    tipo,
    cliente,
    proveedor,
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

  function parseDecimal(str) {
    if (!str) return 0; // Si str es null, undefined o una cadena vacía, devuelve 0
    return parseFloat(str.replace(",", "."));
  }

  useEffect(() => {
    let total = 0;

    movimientos.forEach((movimiento) => {
      if (movimiento.tipo == "Ingreso" && movimiento.entidad == "Banco") {
        total += parseDecimal(movimiento.precioNeto);
      }
    });
    setTotalIngresos(total.toFixed(2));
  }, []);

  useEffect(() => {
    let totalG = 0;

    movimientos.forEach((movimiento) => {
      if (movimiento.tipo === "Gasto" && movimiento.entidad === "Banco") {
        totalG += parseDecimal(movimiento.precioNeto);
      }
    });
    setTotalGastos(totalG.toFixed(2));
    setCalculoTotal(true);
  }, []);

  useEffect(() => {
    if (calculoTotal) {
      let totalB = parseDecimal(totalIngresos) - parseDecimal(totalGastos);
      setTotalDisponible(totalB.toFixed(2));
      setCalculoTotal(false);
    }
  }, [calculoTotal]);

  return (
    <>
      <div className="mt-12  grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsCard
          title="Total Gastado Banco"
          color="blue"
          icon={<ArrowTrendingDownIcon />}
          footer={
            <Typography className="text-center font-normal text-blue-gray-600">
              <strong className="text-red-500">$ {totalGastos} </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Total Ingresos Banco"
          color="blue"
          icon={<ArrowTrendingUpIcon />}
          footer={
            <Typography className="text-center font-normal text-blue-gray-600">
              <strong className="text-green-500">$ {totalIngresos} </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Disponible Banco"
          color="green"
          icon={<HomeModernIcon />}
          footer={
            <Typography className="text-center font-normal text-blue-gray-600">
              <strong className=" text-blue-500">$ {totalDisponible} </strong>
            </Typography>
          }
        />
      </div>
      <ToastContainer pauseOnFocusLoss={false} />

      <div className="mb-4 mt-8 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Typography className="ml-4 font-bold">Listado Banco</Typography>

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
                        nombreCliente,
                        nombreProveedor,
                        precioNeto,
                        entidad,
                        cliente,
                        numeroFactura,

                        proveedor,
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
                          {entidad == "Banco" ? (
                            <>
                              <tr key={_id}>
                                <td className={className}>
                                  <div className="flex items-center gap-4">
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
                                  <Typography
                                    variant="small"
                                    className="mx-2 flex text-xs font-medium text-blue-gray-600"
                                  >
                                    <Button
                                      color="gradient"
                                      className="items-center gap-4 px-6 capitalize"
                                      fullWidth
                                      onClick={(e) =>
                                        handleClick(
                                          e,
                                          _id,
                                          entidad,
                                          tipo,
                                          cliente,
                                          proveedor,
                                          descripcion,
                                          precioNeto
                                        )
                                      }
                                    >
                                      <Typography
                                        color="inherit"
                                        className="font-medium capitalize"
                                      >
                                        editar
                                      </Typography>
                                    </Button>
                                  </Typography>
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
      </div>
    </>
  );
};

export default ListadoBanco;
