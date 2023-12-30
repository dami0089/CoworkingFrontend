import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";

import {
  ArrowUpTrayIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  InboxArrowDownIcon,
  PlusIcon,
  QueueListIcon,
  SquaresPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import useContable from "@/hooks/useContable";

import ModalNuevoMovimiento from "@/components/proveedores/ModalNuevoMovimiento";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Contable() {
  const navigate = useNavigate();
  const {
    movimientos,
    handleModalNuevoMovimiento,
    obtenerMovimientos,
    modalNuevoMovimiento,
    renderMovimiento,
    setRenderMovimiento,
    dashContable,
    obtenerDashContable,
  } = useContable();

  const [mostrarTotalBanco, setMostrarTotalBanco] = useState(0);
  const [mostrarTotalMP, setMostrarTotalMP] = useState(0);
  const [mostrarTotalEfectivo, setMostrarTotalEfectivo] = useState(0);

  const [renderizoMovimientos, setRenderizoMovimientos] = useState(false);

  useEffect(() => {
    const traerInfo = async () => {
      await obtenerDashContable();
    };
    traerInfo();
  }, []);

  useEffect(() => {
    const traerInfo = async () => {
      if (renderMovimiento) {
        await obtenerDashContable();
        setRenderMovimiento(false);
        setRenderizoMovimientos(true);
      }
    };
    traerInfo();
  }, [renderMovimiento]);

  const handleMovimiento = () => {
    handleModalNuevoMovimiento();
  };

  const handleBanco = (e) => {
    e.preventDefault();
    navigate("/contable/banco");
  };

  const handleMp = (e) => {
    e.preventDefault();

    navigate("/contable/mp");
  };

  const handleEfectivo = (e) => {
    e.preventDefault();

    navigate("/contable/efectivo");
  };

  return (
    <>
      <div className="mt-12  grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsCard
          title="Banco"
          color="blue"
          icon={<BanknotesIcon />}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">
                $ {dashContable.banco ? dashContable.banco : "-"}{" "}
              </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Mercado Pago"
          color="pink"
          icon={<CreditCardIcon />}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">
                $ {dashContable.Mp ? dashContable.Mp : "-"}{" "}
              </strong>
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
                $ {dashContable.efectivo ? dashContable.efectivo : "-"}{" "}
              </strong>
            </Typography>
          }
        />
      </div>

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
                    Facturas Pendientes
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
            onClick={(e) => handleBanco(e)}
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
            onClick={(e) => handleMp(e)}
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
            onClick={(e) => handleEfectivo(e)}
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

      {modalNuevoMovimiento ? <ModalNuevoMovimiento /> : ""}
    </>
  );
}

export default Contable;
