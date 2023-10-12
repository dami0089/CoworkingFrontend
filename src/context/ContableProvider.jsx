import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ContableContext = createContext();

const ContableProvider = ({ children }) => {
  //   const [tipo, setTipo] = useState("");
  //   const [planes, setPlanes] = useState([]);
  //   const [nombre, setNombre] = useState("");
  //   const [cuit, setCuit] = useState("");
  //   const [emailFactura, setEmailFactura] = useState("");
  //   const [cantidad, setCantidad] = useState("");
  const [modalNuevoMovimiento, setModalNuevoMovimiento] = useState(false);
  const [modalEditarMovimiento, setModalEditarMovimiento] = useState(false);

  const [entidad, setEntidad] = useState("");
  const [nombreEntidad, setNombreEntidad] = useState("");
  const [tipo, setTipo] = useState("");
  const [idProveedor, setIdProveedor] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [numeroFactura, setNumeroFactura] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioBruto, setPrecioBruto] = useState("");
  const [iva, setIva] = useState("");
  const [precioNeto, setPrecioNeto] = useState("");
  const [movimientos, setMovimientos] = useState([]);
  const [seleccionEntidad, setSeleccionEntidad] = useState(1);
  const [actualizarMovimiento, setActualizarMovimiento] = useState(false);

  const [movimiento, setMovimiento] = useState([]);

  const [gasto, setGasto] = useState([]);
  const [gastoId, setGastoId] = useState({});
  const [renderMovimiento, setRenderMovimiento] = useState(false);
  const [selectorContable, setSelectorContable] = useState(1);
  const [idMovimiento, setIdMovimiento] = useState("");

  // const { auth } = useAuth();

  // Este effect esta para buscar ej la base el listado de movimientos al abrir la seccion movimientos

  const obtenerMovimientos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/contable", config);
      setMovimientos(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  //abre o cierra el modal nuevo cliente
  const handleModalNuevoMovimiento = () => {
    setModalNuevoMovimiento(!modalNuevoMovimiento);
  };

  const handleModalEditarMovimiento = () => {
    setModalEditarMovimiento(!modalEditarMovimiento);
  };

  const handleCloseModalMovimientos = () => {
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
        setEntidad(0);
        setTipo("");
        setIdProveedor("");
        setIdCliente("");
        setNumeroFactura("");
        setDescripcion("");
        setPrecioBruto("");
        setIva("");
        setPrecioNeto("");
        setNombreEntidad("");
        handleModalNuevoMovimiento();
      }
    });
  };

  const editarMovimiento = async (gasto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/contable/${gasto.id}`,
        gasto,
        config
      );

      //Mostrar la alerta
      toast.success("Movimiento actualizado correctamente", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        setTipo("");
        setNumeroFactura("");
        setDescripcion("");
        setPrecioBruto("");
        setEntidad("");
        setIdCliente("");
        setIdProveedor("");
        setIva("");
        setPrecioNeto("");
        handleModalEditarMovimiento();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoGasto = async (gasto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/contable/", gasto, config);
      setGasto(data);
      setGastoId({ idPago: data._id });

      toast.success("Gasto creado correctamente", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        setTipo("");
        setNumeroFactura("");
        setDescripcion("");
        setPrecioBruto("");
        setEntidad("");
        setIva("");
        setPrecioNeto("");
      }, 500);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const cambiarEstado = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post(
        `proveedores/cambiar-estado/${id}`,
        gastoId,
        config
      );
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerMovimiento = async (id) => {
    setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios(`contable/obtener/${id}`, config);

        setMovimiento(data.movimiento);
      } catch (error) {
        toast.error(error.response.data.msg, {
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
    }, 500);
  };

  return (
    <ContableContext.Provider
      value={{
        seleccionEntidad,
        setSeleccionEntidad,
        modalNuevoMovimiento,
        modalEditarMovimiento,
        handleModalNuevoMovimiento,
        handleModalEditarMovimiento,
        handleCloseModalMovimientos,
        setEntidad,
        entidad,
        tipo,
        setTipo,
        idProveedor,
        setIdProveedor,
        idCliente,
        setIdCliente,
        numeroFactura,
        setNumeroFactura,
        descripcion,
        setDescripcion,
        precioBruto,
        setPrecioBruto,
        iva,
        setIva,
        precioNeto,
        setPrecioNeto,
        setNombreEntidad,
        nombreEntidad,
        movimientos,
        movimiento,
        obtenerMovimiento,
        nuevoGasto,
        editarMovimiento,
        gasto,
        cambiarEstado,
        gastoId,
        obtenerMovimientos,
        actualizarMovimiento,
        setActualizarMovimiento,
        renderMovimiento,
        setRenderMovimiento,
        selectorContable,
        setSelectorContable,
        idMovimiento,
        setIdMovimiento,
      }}
    >
      {children}
    </ContableContext.Provider>
  );
};

export { ContableProvider };

export default ContableContext;
