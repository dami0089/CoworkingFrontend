import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { cargarFactura } from "../../../backend/controllers/proveedoresController";
// import fs from "fs";
// import axios from "axios";
// import xml2js from "xml2js";

const ProveedoresContext = createContext();

const ProveedoresProvider = ({ children }) => {
  const [tipoProveedor, setTipoProveedor] = useState("");
  //   const [planes, setPlanes] = useState([]);
  const [nombreProveedor, setNombreProveedor] = useState("");
  const [cuitProveedor, setCuitProveedor] = useState("");
  const [emailProveedor, setEmailProveedor] = useState("");
  //   const [cantidad, setCantidad] = useState("");
  const [modalNuevoProveedor, setModalNuevoProveedor] = useState(false);
  const [modalCargarFactura, setModalCargarFactura] = useState(false);

  const [domicilioProveedor, setDomicilioProveedor] = useState("");

  const [seleccionProveedor, setSeleccionProveedor] = useState(1);

  const [modalNuevoRubro, setModalNuevoRubro] = useState(false);
  const [modalNuevoPago, setModalNuevoPago] = useState(false);

  const [nombreRubro, setNombreRubro] = useState("");
  const [rubros, setRubros] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [facturasPendientesProveedores, setFacturasPendientesProveedores] =
    useState([]);

  const [idProveedorP, setIdProveedorP] = useState("");

  const [proveedorPago, setProveedorPago] = useState("");
  const [numeroFacturaPago, setNumeroFacturaPago] = useState("");
  const [descripcionPago, setDescripcionPago] = useState("");
  const [precioBrutoPago, setPrecioBrutoPago] = useState("");
  const [ivaPago, setIvaPago] = useState("");
  const [precioNetoPago, setPrecioNetoPago] = useState("");
  const [tipoComprobantePago, setTipoComprobantePago] = useState("");
  const [idProveedorPago, setIdProveedorPago] = useState("");
  const [idFacturaAPagar, setIdFacturaAPagar] = useState("");
  const [selectProveedores, setSelectProveedores] = useState(1);

  const { auth } = useAuth();

  // Este effect esta para buscar ej la base el listado de clientes al abrir la seccion clientes

  const obtenerProveedores = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/proveedores", config);
      setProveedores(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const obtenerFacturasProveedores = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios(
          "/proveedores/obtener-facturas",
          config
        );
        setFacturasPendientesProveedores(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerFacturasProveedores();
  }, []);

  //abre o cierra el modal nuevo Proveedor
  const handleModalNuevoProveedor = () => {
    setModalNuevoProveedor(!modalNuevoProveedor);
  };

  const handleModalNuevoPago = () => {
    setModalNuevoPago(!modalNuevoPago);
  };
  //abre o cierra el modal cargar factura
  const handleModalCargarFactura = () => {
    setModalCargarFactura(!modalCargarFactura);
  };

  const handleModalNuevoRubro = () => {
    setModalNuevoRubro(!modalNuevoRubro);
  };
  //   //abre o cierra el modal resumen

  //   //cierra el modal cliente 2
  const onClose = () => {
    Swal.fire({
      title: "Seguro queres cerrar?",
      text: "Toda la info se borrara!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        handleModalNuevoProveedor();
      }
    });
  };

  const onCloseModalRubro = () => {
    Swal.fire({
      title: "Seguro queres cerrar?",
      text: "Toda la info se borrara!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        handleModalNuevoRubro();
      }
    });
  };

  const onCloseCargarFactura = () => {
    Swal.fire({
      title: "Seguro queres cerrar?",
      text: "Toda la info se borrara!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        handleModalCargarFactura();
      }
    });
  };

  //   //Envia a la base de datos la informacion para un nuevo cliente
  const guardarProveedor = async (proveedor) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("/proveedores", proveedor, config);

      toast.success("Proveedor creado correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        setTipoProveedor("");
        setNombreProveedor("");
        setCuitProveedor("");
        setDomicilioProveedor("");
        setEmailProveedor("");
        handleModalNuevoProveedor();
      }, 800);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const cargarFactura = async (factura) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("/proveedores/cargar-factura", factura, config);

      toast.success("Factura cargada correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    const obtenerRubros = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/rubros", config);
        setRubros(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerRubros();
  }, []);

  const nuevoRubro = async (nombre) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("/rubros", nombre, config);

      toast.success("Rubro creado correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        setNombreRubro("");
        handleModalNuevoRubro();
        // navigate("/inicio/proveedores");
      }, 1000);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <ProveedoresContext.Provider
      value={{
        modalNuevoProveedor,
        handleModalNuevoProveedor,
        modalCargarFactura,
        handleModalCargarFactura,
        modalNuevoRubro,
        handleModalNuevoRubro,
        onCloseModalRubro,
        onClose,
        onCloseCargarFactura,
        seleccionProveedor,
        setSeleccionProveedor,
        tipoProveedor,
        setTipoProveedor,
        nombreProveedor,
        setNombreProveedor,
        domicilioProveedor,
        setDomicilioProveedor,
        emailProveedor,
        setEmailProveedor,
        cuitProveedor,
        setCuitProveedor,
        nombreRubro,
        setNombreRubro,
        nuevoRubro,
        rubros,
        guardarProveedor,
        proveedores,
        setProveedores,
        cargarFactura,
        facturasPendientesProveedores,
        handleModalNuevoPago,
        modalNuevoPago,
        proveedorPago,
        setProveedorPago,
        numeroFacturaPago,
        setNumeroFacturaPago,
        descripcionPago,
        setDescripcionPago,
        precioBrutoPago,
        setPrecioBrutoPago,
        ivaPago,
        setIvaPago,
        precioNetoPago,
        setPrecioNetoPago,
        tipoComprobantePago,
        setTipoComprobantePago,
        idProveedorPago,
        setIdProveedorPago,
        idFacturaAPagar,
        setIdFacturaAPagar,
        obtenerProveedores,
        selectProveedores,
        setSelectProveedores,
      }}
    >
      {children}
    </ProveedoresContext.Provider>
  );
};

export { ProveedoresProvider };

export default ProveedoresContext;
