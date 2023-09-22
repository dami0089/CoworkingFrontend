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
        <Route path="crm" element={<Crm />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="proveedores" element={<Proveedores />} />
        <Route path="contable" element={<Contable />} />
        <Route path="salas" element={<Salas />} />
      </Route>
    </Routes>
  );
}

export default App;
