import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import useContable from "@/hooks/useContable";
import { projectsTableData } from "@/data";
import { formatearFecha } from "@/helpers/formatearFecha";
import { StatisticsCard } from "@/widgets/cards";
import ModalEditarMovimientos from "./ModalEditarMovimientos";
import { ToastContainer } from "react-toastify";

const ListadoMercadoPago = () => {
  const {
    handleModalNuevoMovimiento,
    movimientos,
    obtenerMovimiento,
    movimiento,
    handleModalEditarMovimiento,
    obtenerMovimientos,
    setSelectorContable,
    renderizoMovimientos,
    setRenderizoMovimientos,

    modalEditarMovimiento,
    setPrecioNeto,
    renderMovimiento,
    setRenderMovimiento,
    setIdMovimiento,
    setEntidad,
    setDescripcion,
    setTipo,
    setIdCliente,
    setIdProveedor,
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
      await obtenerMovimientos();
    };
    traerInfo();
  }, []);

  useEffect(() => {
    let precio = 0;
    let total = 0;

    movimientos.forEach((movimiento) => {
      if (movimiento.tipo == "Ingreso" && movimiento.entidad == "Mp") {
        precio = parseFloat(movimiento.precioNeto);
        total += precio;
      }
    });
    setTotalIngresos(total.toFixed(2));
  }, []);

  useEffect(() => {
    let precioG = 0;

    let totalG = 0;

    movimientos.forEach((movimiento) => {
      if (movimiento.tipo === "Gasto" && movimiento.entidad === "Mp") {
        precioG = parseFloat(movimiento.precioNeto);
        totalG += precioG;
        // setMovimientoGastoBanco(total);
      }
    });
    setTotalGastos(totalG.toFixed(2));
    setCalculoTotal(true);
  }, []);

  useEffect(() => {
    if (calculoTotal) {
      let totalB = parseFloat(totalIngresos) - parseFloat(totalGastos);
      setTotalDisponible(totalB.toFixed(2));
      setCalculoTotal(false);
    }
  }, [calculoTotal]);

  return (
    <>
      <div className="mt-12  grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsCard
          title="Total Gastado Mercado Pago"
          color="blue"
          icon={<ArrowTrendingDownIcon />}
          footer={
            <Typography className="text-center font-normal text-blue-gray-600">
              <strong className="text-red-500">$ {totalGastos} </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Total Ingresos Mercado Pago"
          color="blue"
          icon={<ArrowTrendingUpIcon />}
          footer={
            <Typography className="text-center font-normal text-blue-gray-600">
              <strong className="text-green-500">$ {totalIngresos} </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Disponible Mercado Pago"
          color="green"
          icon={<HomeModernIcon />}
          footer={
            <Typography className="text-center font-normal text-blue-gray-600">
              <strong className=" text-blue-500">
                $ {totalDisponible ? totalDisponible : "-"}{" "}
              </strong>
            </Typography>
          }
        />
      </div>

      <ToastContainer pauseOnFocusLoss={false} />

      <div className="mb-4 mt-8 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Typography className="ml-4  font-bold">
          Listado Mercado Pago
        </Typography>
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0 text-center">
            <div className="max-h-[78vh] overflow-y-auto">
              <table className=" w-full min-w-[640px] table-auto text-center">
                <thead className="sticky top-0 bg-blue-50">
                  <tr>
                    {[
                      "Fecha",
                      "Nombre",
                      "Concepto",
                      "Debe",
                      "Haber",
                      "Editar",
                    ].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 px-6 py-3 text-left"
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
                          {entidad == "Mp" ? (
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
                                          numeroFactura,
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

export default ListadoMercadoPago;
