import { React } from "react";
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
  Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  ArrowLeftIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  PlusCircleIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";

import useProveedores from "@/hooks/useProveedores";

import Profile from "@/components/clientes/Profile";
import ModalNuevoProveedor from "@/components/proveedores/ModalNuevoProveedor";
// import ModalCargarFactura from "@/components/ModalCargarFacturaProveedor";
import ListadoDeProveedores from "@/components/proveedores/ListadodeProveedores";
import PagadoEnElMes from "@/components/contable/PagadoEnElMes";
import ListadoDeRubros from "@/components/ListadoDeRubros";
import ModalNuevoRubro from "@/components/proveedores/ModalNuevoRubro";
import ModalNuevoMovimiento from "@/components/proveedores/ModalNuevoMovimiento";
import ListadodeFacturasAPagar from "@/components/proveedores/ListadodeFacturasAPagar";
import ModalNuevoPago from "@/components/proveedores/ModalNuevoPago";

export function Proveedores() {
  const {
    handleModalNuevoProveedor,
    handleModalNuevoRubro,
    handleModalCargarFactura,
    seleccionProveedor,
    setSeleccionProveedor,
    modalNuevoProveedor,
    modalNuevoRubro,
    modalNuevoMovimiento,
    modalNuevoPago,
  } = useProveedores();

  const handleClick = () => {
    // handleModalNuevoPlan();
    setSeleccion(5);
  };

  return seleccionProveedor == 1 ||
    seleccionProveedor == 2 ||
    seleccionProveedor == 3 ||
    seleccionProveedor == 4 ||
    seleccionProveedor == 5 ? (
    <>
      <div className="mt-12">
        <div className="mb-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          <Card>
            <Button
              variant="gradient"
              color="blue"
              className="absolute -mt-4 grid h-16 w-16 place-items-center"
              onClick={handleModalNuevoProveedor}
            >
              <PlusIcon />
            </Button>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Nuevo Proveedor
              </Typography>
            </CardBody>
          </Card>
          <Card>
            <Button
              variant="gradient"
              color="pink"
              className="absolute -mt-4 grid h-16 w-16 place-items-center"
              onClick={handleModalCargarFactura}
            >
              <BanknotesIcon />
            </Button>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Cargar Factura
              </Typography>
            </CardBody>
          </Card>
          <Card>
            <Button
              variant="gradient"
              color="green"
              className="absolute -mt-4 grid h-16 w-16 place-items-center"
              onClick={(e) => setSeleccionProveedor(5)}
            >
              <BuildingStorefrontIcon />
            </Button>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Pagos pendientes
              </Typography>
            </CardBody>
          </Card>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  {seleccionProveedor == 1 ? "Listado de Proveedores" : ""}
                  {seleccionProveedor == 5 ? "Facturas por pagar" : ""}
                </Typography>
              </div>

              <Menu placement="left-start">
                <div>
                  {seleccionProveedor == 1 ? (
                    <>
                      <div className="flex justify-center">
                        <Button
                          className="w-30 mx-2 bg-green-300 text-center"
                          fullWidth
                          onClick={(e) => setSeleccionProveedor(5)}
                        >
                          volver
                        </Button>
                      </div>
                    </>
                  ) : seleccionProveedor == 5 ? (
                    <>
                      <Button
                        className="w-30 mx-2 bg-green-300 text-center "
                        fullWidth
                        onClick={(e) => setSeleccionProveedor(1)}
                      >
                        Volver
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </Menu>
            </CardHeader>

            {seleccionProveedor == 1 ? <ListadoDeProveedores /> : ""}
            {seleccionProveedor == 5 ? <ListadodeFacturasAPagar /> : ""}
          </Card>
        </div>
        {modalNuevoProveedor ? <ModalNuevoProveedor /> : ""}
        {modalNuevoRubro ? <ModalNuevoRubro /> : ""}
        {modalNuevoMovimiento ? <ModalNuevoMovimiento /> : ""}
        {modalNuevoPago ? <ModalNuevoPago /> : ""}
      </div>
    </>
  ) : (
    <Profile />
  );
}

export default Proveedores;
