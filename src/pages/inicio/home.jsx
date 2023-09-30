import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsChartsData } from "@/data";

import useClientes from "@/hooks/useClientes";
import {
  BanknotesIcon,
  ChartBarIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import ModalNuevoUsuario from "@/components/clientes/ModalNuevoUsuario";
import { ToastContainer } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import Qr from "@/components/Qr";

export function Home() {
  const { conteo, clientesRecientes, handleModalNuevoUsuario } = useClientes();

  const { modalQr } = useAuth();

  return (
    <div className="mt-12">
      <ToastContainer pauseOnFocusLoss={false} />
      <div className="mb-12 grid gap-y-10 gap-x-6 hover:cursor-pointer md:grid-cols-2 xl:grid-cols-4">
        <Card onClick={(e) => handleModalNuevoUsuario()}>
          <StatisticsCard
            key="Facturado Hoy"
            title="Nuevo Usuario"
            icon={<UserPlusIcon className=" bg-blue-300" />}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className="text-green-500">
                  Crear un nuevo Usuario
                </strong>
              </Typography>
            }
          />
        </Card>

        <StatisticsCard
          key="Total de Clientes"
          title="Total de Clientes"
          icon={<UserIcon className=" bg-pink-300" />}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">{conteo}</strong>
              &nbsp;en total
            </Typography>
          }
        />
        <StatisticsCard
          key="Nuevos clientes"
          title="Nuevos clientes"
          icon={<UserPlusIcon className="bg-green-300" />}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">{clientesRecientes}</strong>
              &nbsp;ultimos 7 dias
            </Typography>
          }
        />
        <StatisticsCard
          key="Facturado mes"
          title="Facturado mes"
          icon={<ChartBarIcon className="bg-orange-300" />}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">+55%</strong>
              &nbsp;Este mes
            </Typography>
          }
        />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <ModalNuevoUsuario />
      {modalQr ? <Qr /> : ""}
    </div>
  );
}

export default Home;
