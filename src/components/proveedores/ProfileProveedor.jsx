import {
  Card,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ArrowLeftCircleIcon,
  CurrencyDollarIcon,
  PlusIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { projectsTableData } from "@/data";
import { SpinnerCircular } from "spinners-react";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";

import useClientes from "@/hooks/useClientes";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

import Swal from "sweetalert2";

import { formatearFecha } from "@/helpers/formatearFecha";
import useProveedores from "@/hooks/useProveedores";

export function ProfileProveedor() {
  const { valueProfile, setValueProfile, cargando } = useClientes();

  const {
    cuitEditarProveedores,
    setCuitEditarProveedores,
    proveedor,
    obtenerProveedor,
    setSelectProveedores,
    idEditarProveedor,
    modalEditarProveedor,
    handleEditarProveedor,
    setTipoProveedor,
    setNombreProveedor,
    setCuitProveedor,
    setDomicilioProveedor,
    setEmailProveedor,
    actualizoProveedor,
    setActualizoProveedor,
    setTelefonoProveedor,
  } = useProveedores();

  const [renderizo, setRenderizo] = useState(false);

  useEffect(() => {
    const traerData = async () => {
      await obtenerProveedor(idEditarProveedor);
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      if (actualizoProveedor) {
        await obtenerProveedor(idEditarProveedor);
        setActualizoProveedor(false);
      }
    };
    traerData();
  }, [actualizoProveedor]);

  const handleBack = (e) => {
    e.preventDefault();
    // setEditarCliente("");
    // setTipo("");
    // setCuitEditar("");
    // setNombre("");
    // setCuit("");
    // setDomicilio("");
    // setEmailFactura("");
    // setFechaVencimiento("");
    // setCantidad("");
    setSelectProveedores(2);
  };

  const handleClickEditar = async () => {
    handleEditarProveedor();
    setTipoProveedor(proveedor.tipo);
    setNombreProveedor(proveedor.nombre);
    setCuitProveedor(proveedor.cuit);
    setTelefonoProveedor(proveedor.telefono);
    setDomicilioProveedor(proveedor.domicilio);
    setEmailProveedor(proveedor.email);
  };

  return (
    <>
      <>
        <ToastContainer pauseOnFocusLoss={false} />

        <Card className="mx-3 mb-6 mt-8 lg:mx-4">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {proveedor.nombre}
                  </Typography>
                </div>
              </div>
              <div className="block w-96">
                <Tabs value="app">
                  <TabsHeader>
                    <Tab value="app" onClick={(e) => setValueProfile(1)}>
                      <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      Inicio
                    </Tab>
                    <Tab value="message" onClick={(e) => setValueProfile(2)}>
                      <CurrencyDollarIcon className="w-15 -mt-0.5 mr-2 inline-block h-5" />
                      Facturas
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>
            {valueProfile == 1 ? (
              <>
                <div className="mb-12 grid grid-cols-2 gap-28 px-4 lg:grid-cols-2 xl:grid-cols-2">
                  <div>
                    <ProfileInfoCard
                      title="Informacion"
                      details={{
                        Nombre: `${proveedor.nombre}`,
                        "Telefono Corporativo": `${
                          proveedor.telefono ? proveedor.telefono : "-"
                        }`,
                        "Email Factura": `${proveedor.email}`,
                        Direccion: `${proveedor.domicilio}`,
                        cuit: `${proveedor.cuit}`,
                        //   editarCliente.fechaVencimiento
                        // )}`,
                      }}
                    />
                  </div>
                  <div className="justify-top flex flex-col">
                    <div className="mb-2">
                      <Button
                        className={`w-full bg-green-300`}
                        onClick={(e) => handleClickEditar()}
                      >
                        Editar Datos
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </CardBody>
        </Card>
      </>
    </>
  );
}

export default ProfileProveedor;
