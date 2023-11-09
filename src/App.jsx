import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn, SignUp } from "./pages/auth";
import PrimerPassword from "./pages/auth/PrimerPassword";
import OlvidePassword from "./pages/auth/OlvidePassword";
import NuevoPassword from "./pages/auth/NuevoPassword";
import RutaProtegida from "./layouts/RutaProtegida";
import { Home } from "./pages/inicio";
import Crm from "./pages/inicio/crm";
import { Clientes } from "./pages/inicio/clientes";
import Proveedores from "./pages/inicio/proveedores";
import Contable from "./pages/inicio/contable";
import Salas from "./pages/inicio/salas";
import Planes from "./components/clientes/Planes";
import ListadodeAsistencias from "./components/clientes/ListadodeAsistencias";
import ListadodeProximosVencimientos from "./components/clientes/ListadodeProximosVencimientos";
import Profile from "./components/clientes/Profile";
import ListadodeClientes from "./components/clientes/ListadodeClientes";
import ListadoUsuarios from "./components/clientes/ListadoUsuarios";
import ListadodeClientesInactivos from "./components/clientes/ListadodeClientesInactivos";
import RegistrarClientes from "./components/clientes/RegistrarClientes";
import ListadoBanco from "./components/contable/ListadoBanco";
import ListadoMercadoPago from "./components/contable/ListadoMercadoPago";
import ListadoCaja from "./components/contable/ListadoCaja";
import ListadoReservasSalaAmsterdam from "./components/salas/ListadoReservasSalaAmsterdam";
import ListadoReservasCabinaPrivada from "./components/salas/ListadoReservasCabinaPrivada";
import ListadoReservasSalaBsAs from "./components/salas/ListadoReservasSalaBsAs";
import ListadoReservasSalaMadrid from "./components/salas/ListadoReservasSalaMadrid";
import ListadoReservasSalaParis from "./components/salas/ListadoReservasSalaParis";
import ListadoDeProveedores from "./components/proveedores/ListadodeProveedores";
import ProfileProveedor from "./components/proveedores/ProfileProveedor";

//TODO:FALTA AGREGAR EL BAR AL MENU
function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      {/* <Route path="registrar" element={<SignUp />} /> */}
      <Route path="crear-password/:token" element={<PrimerPassword />} />
      <Route path="olvide-password" element={<OlvidePassword />} />
      <Route path="olvide-password/:token" element={<NuevoPassword />} />
      {/* <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} /> */}

      <Route path="/inicio" element={<RutaProtegida />}>
        <Route index element={<Home />} />
      </Route>
      {/* Rutas Clientes */}
      <Route path="/clientes" element={<RutaProtegida />}>
        <Route index element={<Clientes />} />
        <Route path="planes-activos" element={<Planes />} />
        <Route path="asistencias" element={<ListadodeAsistencias />} />
        <Route
          path="proximos-vencimientos"
          element={<ListadodeProximosVencimientos />}
        />
        <Route path="perfil" element={<Profile />} />
        <Route path="listado-clientes" element={<ListadodeClientes />} />
        <Route path="listado-usuarios" element={<ListadoUsuarios />} />
        <Route
          path="listado-clientes-inactivos"
          element={<ListadodeClientesInactivos />}
        />
        <Route path="ingresar-visitante" element={<RegistrarClientes />} />
        {/* <Route path="asistencias" element={<Asisten />} /> */}
      </Route>

      <Route path="/proveedores" element={<RutaProtegida />}>
        <Route index element={<Proveedores />} />
        <Route path="listado-proveedores" element={<ListadoDeProveedores />} />
        <Route path="perfil-proveedor" element={<ProfileProveedor />} />
      </Route>

      {/* Routes Contables */}
      <Route path="/contable" element={<RutaProtegida />}>
        <Route index element={<Contable />} />
        <Route path="banco" element={<ListadoBanco />} />
        <Route path="mp" element={<ListadoMercadoPago />} />
        <Route path="efectivo" element={<ListadoCaja />} />
      </Route>

      {/* Routes de Salas */}
      <Route path="/salas" element={<RutaProtegida />}>
        <Route index element={<Salas />} />
        <Route path="amsterdam" element={<ListadoReservasSalaAmsterdam />} />
        <Route path="cabina" element={<ListadoReservasCabinaPrivada />} />
        <Route path="bsas" element={<ListadoReservasSalaBsAs />} />
        <Route path="madrid" element={<ListadoReservasSalaMadrid />} />
        <Route path="paris" element={<ListadoReservasSalaParis />} />
      </Route>
    </Routes>
  );
}

export default App;
