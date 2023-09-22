import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Button,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import {
  ArrowUpTrayIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  GlobeAsiaAustraliaIcon,
  HandThumbDownIcon,
  InboxArrowDownIcon,
  PlusIcon,
  QueueListIcon,
  SquaresPlusIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import useContable from "@/hooks/useContable";
import ListadoBanco from "@/components/contable/ListadoBanco";
import ListadoMercadoPago from "@/components/contable/ListadoMercadoPago";
import ListadoCaja from "@/components/contable/ListadoCaja";
import ListadoCripto from "@/components/contable/ListadoCripto";
import ModalNuevoMovimiento from "@/components/proveedores/ModalNuevoMovimiento";
import ModalEditarMovimiento from "@/components/contable/ModalEditarMovimiento";
import { ToastContainer } from "react-toastify";

export function Contable() {
  const {
    seleccionEntidad,
    setSeleccionEntidad,
    movimientos,
    handleModalNuevoMovimiento,
    obtenerMovimientos,
    modalNuevoMovimiento,
    modalEditarMovimiento,
    renderMovimiento,
    setRenderMovimiento,
    selectorContable,
    setSelectorContable,
  } = useContable();

  const [mostrarTotalBanco, setMostrarTotalBanco] = useState(0);
  const [mostrarTotalMP, setMostrarTotalMP] = useState(0);
  const [mostrarTotalEfectivo, setMostrarTotalEfectivo] = useState(0);
  const [mostrarTotalCripto, setMostrarTotalCripto] = useState(0);

  const [renderizoMovimientos, setRenderizoMovimientos] = useState(false);

  useEffect(() => {
    const traerInfo = async () => {
      await obtenerMovimientos();
      setRenderizoMovimientos(true);
    };
    traerInfo();
  }, []);

  useEffect(() => {
    const traerInfo = async () => {
      if (renderMovimiento) {
        await obtenerMovimientos();
        setRenderMovimiento(false);
        setRenderizoMovimientos(true);
      }
    };
    traerInfo();
  }, [renderMovimiento]);

  useEffect(() => {
    if (renderizoMovimientos) {
      let precio = 0;
      let precioG = 0;
      let total = 0;
      let totalG = 0;
      let totalB = 0;
      movimientos.forEach((movimiento) => {
        if (movimiento.tipo == "Ingreso" && movimiento.entidad == "Banco") {
          precio = parseFloat(movimiento.precioNeto);
          total += precio;
        }
        if (movimiento.tipo == "Gasto" && movimiento.entidad == "Banco") {
          precioG = parseFloat(movimiento.precioNeto);
          totalG += precioG;
          // setMovimientoGastoBanco(total);
        }
      });

      totalB = total - totalG;
      setMostrarTotalBanco(totalB.toFixed(2));

      setRenderizoMovimientos(false);
    }
  }, [renderizoMovimientos]);

  useEffect(() => {
    if (renderizoMovimientos) {
      let precio = 0;
      let precioG = 0;
      let total = 0;
      let totalG = 0;
      let totalB = 0;
      movimientos.forEach((movimiento) => {
        if (movimiento.tipo == "Ingreso" && movimiento.entidad == "MP") {
          precio = parseFloat(movimiento.precioNeto);
          total += precio;
        }
        if (movimiento.tipo == "Gasto" && movimiento.entidad == "MP") {
          precioG = parseFloat(movimiento.precioNeto);
          totalG += precioG;
          // setMovimientoGastoBanco(total);
        }
      });

      totalB = total - totalG;
      setMostrarTotalMP(totalB.toFixed(2));
      setRenderizoMovimientos(false);
    }
  }, [renderizoMovimientos]);

  useEffect(() => {
    if (renderizoMovimientos) {
      let precio = 0;
      let precioG = 0;
      let total = 0;
      let totalG = 0;
      let totalB = 0;
      movimientos.forEach((movimiento) => {
        if (movimiento.tipo == "Ingreso" && movimiento.entidad == "Efectivo") {
          precio = parseFloat(movimiento.precioNeto);
          total += precio;
        }
        if (movimiento.tipo == "Gasto" && movimiento.entidad == "Efectivo") {
          precioG = parseFloat(movimiento.precioNeto);
          totalG += precioG;
          // setMovimientoGastoBanco(total);
        }
      });

      totalB = total - totalG;
      setMostrarTotalEfectivo(totalB.toFixed(2));
      setRenderizoMovimientos(false);
    }
  }, [renderizoMovimientos]);

  const handleMovimiento = () => {
    handleModalNuevoMovimiento();
  };

  return (
    <>
      <div className="mt-12  grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsCard
          title="Banco"
          color="blue"
          icon={<BanknotesIcon />}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">$ {mostrarTotalBanco} </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Mercado Pago"
          color="pink"
          icon={<CreditCardIcon />}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">$ {mostrarTotalMP} </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Efectivo"
          color="green"
          icon={<CurrencyDollarIcon />}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">
                $ {mostrarTotalEfectivo}{" "}
              </strong>
            </Typography>
          }
        />
      </div>
      {selectorContable == 1 ? (
        <>
          <div className="mt-10 flex flex-wrap justify-between">
            <ToastContainer pauseOnFocusLoss={false} />

            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              // onClick={handleModalNuevoCliente}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <SquaresPlusIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Nueva Factura
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => handlePlanesActivos()}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <InboxArrowDownIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Recibos
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccion(3)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <ArrowUpTrayIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Orden de Pago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>
          <div className="mt-5 flex flex-wrap justify-between">
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={handleMovimiento}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <PlusIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Nuevo Movimiento
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => handlePlanesActivos()}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <CheckBadgeIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Facturas pendientes de cobro
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccion(3)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <ClockIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Libro Diario
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>

          <div className="mt-5 flex flex-wrap justify-between">
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => setSelectorContable(2)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <CalendarDaysIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Banco
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => setSelectorContable(3)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <QueueListIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Mercado Pago
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => setSelectorContable(4)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <UsersIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Efectivo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : selectorContable == 2 ? (
        <ListadoBanco />
      ) : selectorContable == 3 ? (
        <ListadoMercadoPago />
      ) : selectorContable == 4 ? (
        <ListadoCaja />
      ) : (
        ""
      )}

      {modalNuevoMovimiento ? <ModalNuevoMovimiento /> : ""}
      {modalEditarMovimiento ? <ModalEditarMovimiento /> : ""}
    </>
  );
}

export default Contable;
