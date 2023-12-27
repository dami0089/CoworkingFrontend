import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ModalEditarAsistencia from "../components/clientes/ModalEditarAsistencia";

const ClientesContext = createContext();

const ClientesProvider = ({ children }) => {
  const [idAdicionalmodificar, setIdAdicionalModificar] = useState("");
  const [descripcionAd, setDescripcionAd] = useState("");
  const [importeAd, setImporteAd] = useState("");
  const [notasAd, setNotasAd] = useState("");
  const [tipo, setTipo] = useState("");
  const [planes, setPlanes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");
  const [emailFactura, setEmailFactura] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [modalNuevoCliente, setModalNuevoCliente] = useState(false);
  const [modalNuevoCliente2, setModalNuevoCliente2] = useState(false);
  const [modalNuevoPlan, setModalNuevoPlan] = useState(false);
  const [modalModificarPlan, setModalModificarPlan] = useState(false);
  const [modalEditarUsuario, setModalEditarUsuario] = useState(false);
  const [modalEditarAdicional, setModalEditarAdicional] = useState(false);

  const [modalEditarCliente, setModaleEditarCliente] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [valueProfile, setValueProfile] = useState(1);
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [dniUsuario, setDniUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [celuUsuario, setCeluUsuario] = useState("");
  const [modalResumen, setModalResumen] = useState(false);
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarPlanes, setMostrarPlanes] = useState([]);
  const [seleccion, setSeleccion] = useState(1);
  const [nombrePlan, setNombrePlan] = useState("");
  const [descripcionPlan, setDescripcionPlan] = useState("");
  const [horasSalas, setHorasSalas] = useState("");
  const [precioPlan, setPrecioPlan] = useState("");
  const [editarCliente, setEditarCliente] = useState({});
  const [formaDePago, setFormaDePago] = useState(2);
  const [cuitEditar, setCuitEditar] = useState("");
  const [obtenerUsuario, setObtenerUsuario] = useState([]);
  const [obtenerUs, setObtenerUs] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [efectivo, setEfectivo] = useState(false);
  const [conteo, setConteo] = useState("");
  const [clientesRecientes, setClientesRecientes] = useState("");
  const [fechaEditar, setFechaEditar] = useState("");
  const [modificarPrecioPlan, setModificarPrecioPlan] = useState("");
  const [modificarNombrePlan, setModificarNombrePlan] = useState("");
  const [modificarHorasSalas, setModificarHorasSalas] = useState("");
  const [modificarDescripcionPlan, setModificardescripcionPlan] = useState("");
  const [idModificarPlan, setIdModificarPlan] = useState("");
  const [isActivo, setIsActivo] = useState("");
  const [modalAgregarUsuario, setModalAgregarUsuario] = useState(false);
  const [idAsistencias, setIdAsistencias] = useState("");
  const [asistencias, setAsistencias] = useState([]);
  const [adicional, setAdicional] = useState([]);

  const [nombreProfileAsistencia, setNombreProfileAsistencia] = useState("");
  const [planprofileAsistencias, setPlanProfileAsistencias] = useState("");
  const [asistioHoyProfileAsistencias, setAsistioHoyProfileAsistencias] =
    useState("");
  const [modalEditarAsistencia, setModalEditarAsistencia] = useState(false);

  const [dataAsistencia, setDataAsistencia] = useState([]);
  const [fechaAsistenciaModificar, setFechaAsistenciaModificar] = useState("");
  const [idModificarAsistencia, setIdModificarAsistencia] = useState("");
  const [configuracionDelCliente, setConfiguracionDelCliente] = useState("");
  const [idUsuarioModificar, setIdUsuarioModificar] = useState("");
  const [modalEliminarUsuario, setModalEliminarUsuario] = useState(false);
  const [modalAdicional, setModalAdicional] = useState(false);
  const [modalNuevoUsuario, setModalNuevoUsuario] = useState(false);

  const [nombreUSuarioNuevo, setNombreUsuarioNuevo] = useState("");
  const [apellidoUSuarioNuevo, setApellidoUsuarioNuevo] = useState("");
  const [emailUSuarioNuevo, setEmailUsuarioNuevo] = useState("");
  const [actualizoUsuarios, setActualizoUsuarios] = useState(false);
  const [renovarListadoAsistenciaProfile, setRenovarListadoAsistenciaProfile] =
    useState(false);

  const [nombreVisitante, setNombreVisitante] = useState("");
  const [dniVisitante, setDniVisitante] = useState("");
  const [fechaNacVisitante, setFechaNacVisitante] = useState("");
  const [nacionalidadVisitante, setNacionalidadVisitante] = useState("");
  const [celuVisitante, setCeluVisitante] = useState("");
  const [mailVisitante, setMailVisitante] = useState("");
  const [motivoVisita, setMotivoVisita] = useState("");
  const [actualizarListadoVisitante, setActualizarListadoVisitante] =
    useState(false);

  const [nuevoUsuarioAdmin, setNuevoUsuarioAdmin] = useState(false);

  const [idClienteAEditar, setIdClienteAEditar] = useState("");
  const [rol, setRol] = useState("");

  const [telefono, setTelefono] = useState("");

  const handleModalNuevoUsuario = () => {
    setModalNuevoUsuario(!modalNuevoUsuario);
  };

  const handleModalNuevoUsuarioAdmin = () => {
    setNuevoUsuarioAdmin(!nuevoUsuarioAdmin);
  };

  const { auth } = useAuth();

  // Este effect esta para buscar ej la base el listado de clientes al abrir la seccion clientes

  const obtenerClientes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/clientes", config);
      //guarda los datos de los clientes
      setClientes(data);
      //guarda la cantidad de clientes
      const cuenta = data.length; // Contar los clientes
      setConteo(cuenta);
      //guarda los clientes de los ultimos 7 dias
      // Convertir las fechas de string a objetos Date
      const client = data.map((cliente) => ({
        ...cliente,
        fechaAlta: new Date(cliente.fechaAlta),
      }));
      // Filtrar los clientes que se dieron de alta en los últimos 7 días
      const fechaActual = new Date();
      const ultimosClientes = client.filter(
        (cliente) =>
          fechaActual.getTime() - cliente.fechaAlta.getTime() <=
          7 * 24 * 60 * 60 * 1000
      );
      // Actualizar el estado de los clientes y del conteo
      setClientesRecientes(ultimosClientes.length);
    } catch (error) {
      console.log(error);
    }
  };

  //Este effect busca en la base los usuarios registrados, al abrir esa pantalla

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios("/usuarios/listado", config);

      setUsuarios(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [clientesTres, setClientesTres] = useState([]);

  const obtenerClientesTresVecesPorSemana = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios("/clientes/tres-veces", config);

      setClientesTres(data);
    } catch (error) {
      console.log(error);
    }
  };

  //este effect busca en la base los planes

  const obtenerPlanes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios("/planes", config);
      setMostrarPlanes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  //abre o cierra el modal nuevo cliente
  const handleModalNuevoCliente = () => {
    setModalNuevoCliente(!modalNuevoCliente);
  };

  const handleEliminarUsuario = () => {
    setModalEliminarUsuario(!modalEliminarUsuario);
  };

  const handleModalEditarAsistencia = () => {
    setModalEditarAsistencia(!modalEditarAsistencia);
  };

  const handleModalAgregarUsuario = () => {
    setModalAgregarUsuario(!modalAgregarUsuario);
  };

  const handleModalEditarAdicional = () => {
    setModalEditarAdicional(!modalEditarAdicional);
  };
  //abre o cierra el modal nuevo cliente 2
  const handleModalNuevoCliente2 = () => {
    setModalNuevoCliente2(!modalNuevoCliente2);
  };

  const handleModalEditarUsuario = () => {
    setModalEditarUsuario(!modalEditarUsuario);
  };
  //abre o cierra el modal resumen
  const handleModalResumen = () => {
    setModalResumen(!modalResumen);
  };

  const handleModalEditarCliente = () => {
    setModaleEditarCliente(!modalEditarCliente);
  };
  //abre o cierra el modal nuevo plan
  const handleModalNuevoPlan = () => {
    setModalNuevoPlan(!modalNuevoPlan);
  };

  const handleModalAdicional = () => {
    setModalAdicional(!modalAdicional);
  };

  const handleModalModificarPlan = () => {
    setModalModificarPlan(!modalModificarPlan);
  };
  //vuelve para atras el modal cliente 2
  const handleBack = () => {
    setModalNuevoCliente2(!modalNuevoCliente2);
    setModalNuevoCliente(!modalNuevoCliente);
  };
  //vuelve para atras el modal resumen
  const handleBack2 = () => {
    setModalResumen(!modalResumen);
    setModalNuevoCliente2(!modalNuevoCliente2);
  };
  //cierra el modal cliente 2
  const handleClose = () => {
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
        setTipo("");
        setPlanes("");
        setNombre("");
        setCuit("");
        setEmailFactura("");
        setCantidad("");
        setNombreUsuario("");
        setApellidoUsuario("");
        setDniUsuario("");
        setEmailUsuario("");
        setCeluUsuario("");
        handleModalNuevoCliente2();
      }
    });
  };
  //cierra el modal de planes
  const handleCloseModalNuevoPlan = () => {
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
        handleModalNuevoPlan();
      }
    });
  };

  const handleCloseModalModificarPlan = () => {
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
        handleModalModificarPlan();
      }
    });
  };
  //cierra el modal clientes1
  const handleClose1 = () => {
    if (
      tipo == "" &&
      nombre == "" &&
      cuit == "" &&
      domicilio == "" &&
      cantidad == ""
    ) {
      handleModalNuevoCliente();
    } else {
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
          setTipo("");
          setPlanes("");
          setNombre("");
          setCuit("");
          setEmailFactura("");
          setDomicilio("");
          setCantidad("");
          setNombreUsuario("");
          setApellidoUsuario("");
          setDniUsuario("");
          setEmailUsuario("");
          setCeluUsuario("");
          handleModalNuevoCliente();
        }
      });
    }
  };

  const onCloseEditar = () => {
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
        setTipo("");
        setPlanes("");
        setNombre("");
        setCuit("");
        setFechaVencimiento("");
        setDomicilio("");
        setEmailFactura("");
        setCantidad("");
        setNombreUsuario("");
        setApellidoUsuario("");
        setDniUsuario("");
        setEmailUsuario("");
        setCeluUsuario("");
        handleModalEditarCliente();
      }
    });
  };

  //cierra el modal resumen
  const handleClose3 = () => {
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
        setTipo("");
        setPlanes("");
        setNombre("");
        setCuit("");
        setFechaVencimiento("");
        setDomicilio("");
        setEmailFactura("");
        setCantidad("");
        setNombreUsuario("");
        setApellidoUsuario("");
        setDniUsuario("");
        setEmailUsuario("");
        setCeluUsuario("");
        handleModalResumen();
      }
    });
  };
  //Envia a la base de datos la informacion para un nuevo plan
  const nuevoPlan = async (plan) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("/planes", plan, config);

      toast.success("Plan creado correctamente", {
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

  const editarC = async (cliente) => {
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
        `/clientes/${cliente.id}`,
        cliente,
        config
      );

      //Mostrar la alerta
      toast.success("Cliente actualizado correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //redireccionar
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //Envia a la base de datos la informacion para un nuevo cliente
  const nuevoCliente = async (cliente) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/clientes", cliente, config);

      toast.success(data.msg, {
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
        setTipo("");
        setPlanes("");
        setNombre("");
        setCuit("");
        setFechaVencimiento("");
        setDomicilio("");
        setEmailFactura("");
        setCantidad("");
      }, 3000);
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
  };

  const editarClientes = async (cliente) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.put(`/clientes/${cliente.id}`, cliente, config);

      toast.success("Cliente Editado correctamente", {
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
        setTipo("");
        setPlanes("");
        setNombre("");
        setCuit("");
        setFechaVencimiento("");
        setDomicilio("");
        setEmailFactura("");
        setCantidad("");
      }, 3000);
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

  const nuevoUsuario = async (usuario) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("usuarios/", usuario, config);

      toast.success("Usuario creado correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmailUsuarioNuevo("");
      setNombreUsuarioNuevo("");
      setApellidoUsuarioNuevo("");
      handleModalNuevoUsuario();
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

  //Envia a la base de datos la informacion para un nuevo cliente
  const adicionales = async (adicional) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("/clientes/adicional", adicional, config);

      toast.success("Adicional agregado al cliente", {
        position: "top-right",
        autoClose: 1500,
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

  //Guarda los usuarios en la base de datos
  const guardarUsuarios = async (
    nombre,
    apellido,
    dni,
    email,
    celu,
    cuit,
    plan
  ) => {
    console.log("guardar usuarios");
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/usuarios`,
        {
          nombre,
          apellido,
          dni,
          email,
          celu,
          cuit,
          plan,
        },
        config
      );
      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
  };

  const guardarUsuarioAdmin = async (
    nombre,
    apellido,
    dni,
    email,
    celu,
    rol
  ) => {
    const info = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      email: email,
      celu: celu,
      rol: rol,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/usuarios/administrador`,
        info,
        config
      );
      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
  };

  const editarUsuarios = async (
    _id,
    nombre,
    apellido,
    dni,
    email,
    celu,
    plan
  ) => {
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
        `/usuarios/editar-usuarios/${_id}`,
        {
          nombre,
          apellido,
          dni,
          email,
          celu,
          plan,
        },
        config
      );
      toast.success("Editado Correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
  };

  const editarAdicional = async (_id, detalle, importe, notas) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/clientes/editar-adicional/${_id}`,
        {
          detalle,
          importe,
          notas,
        },
        config
      );
      toast.success("Editado Correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
  };

  const obtenerCliente = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/clientes/obtener/${id}`, config);

      setEditarCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [actualizoListado, setActualizoListado] = useState(false);

  const resetAsistencias = async () => {
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
        `/clientes/reset-asistencias`,
        config
      );
      setActualizoListado(true);
      toast.success("Todas las asistencias se han reiniciado", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerAsistencias = async (id) => {
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
        `/clientes/obtener-asistencias/${id}`,

        config
      );

      setAsistencias(data.asistencias);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerAdicionales = async (id) => {
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
        `/clientes/obtener-adicionales/${id}`,
        config
      );

      setAdicional(data.adicionales);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerPlan = async (id) => {
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
        `/clientes/editar-plan/${id}`,
        config
      );
      console.log(data.plan);
      setModificarNombrePlan(data.plan.nombre);
      setModificarHorasSalas(data.plan.horasSalas);
      setModificarPrecioPlan(data.plan.precio);
      setModificardescripcionPlan(data.plan.descripcion);
      setIdModificarPlan(data.plan._id);
    } catch (error) {
      console.log(error);
    }
  };

  const almacenarAsistencia = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/clientes/asistencias/${id}`,
        {},
        config
      );

      setDataAsistencia(data);

      if (data.tipo === 0) {
        toast.success(data.mensaje, {
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

      if (data.tipo === 2) {
        toast.warning(data.mensaje, {
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

      if (data.tipo === 1) {
        toast.error(data.mensaje, {
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

      //Mostrar la alerta
    } catch (error) {
      toast.error(error.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editarPlan = async (plan) => {
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
        `/clientes/editar-plan/${plan.id}`,
        plan,
        config
      );

      //Mostrar la alerta
      toast.success("Plan actualizado correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        handleModalModificarPlan();
        setModificarNombrePlan("");
        setModificardescripcionPlan("");
        setModificarPrecioPlan("");
        setModificarHorasSalas("");
      }, 1000);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const desactivarCliente = async (cliente) => {
    console.log(cliente);
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
        `/clientes/desactivar-activar/${cliente.id}`,
        cliente,
        config
      );

      setIsActivo(data.isActivo);

      toast.success("Estado del cliente actualizado correctamente", {
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerUsuarioProfile = async (id) => {
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
        `/clientes/buscar-prueba/${id}`,
        config
      );
      setObtenerUsuario(data);
      // setDataUserProvider(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarAsistencia = async (id, fecha) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/clientes/editar-asistencia/${id}`,
        { fecha },
        config
      );

      //Mostrar la alerta
      toast.success("Asistencia actualizado correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        setIdModificarAsistencia("");
        setFechaAsistenciaModificar("");
        handleModalEditarAsistencia();
      }, 1000);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const eliminarAsistencia = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(
        `/clientes/eliminar-asistencia/${id}`,
        config
      );

      //Mostrar la alerta
      toast.success("Asistencia Eliminada correctamente", {
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const eliminarUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(
        `/usuarios/eliminar-usuario/${id}`,
        config
      );

      //Mostrar la alerta
      toast.success(data.msg, {
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const registrarVisitante = async (
    nombre,
    dni,
    nacionalidad,
    fechaNac,
    celular,
    email,
    motivo
  ) => {
    const info = {
      nombre: nombre,
      dni: dni,
      nacionalidad: nacionalidad,
      fechaNac: fechaNac,
      celular: celular,
      email: email,
      motivo: motivo,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("/clientes/registrar-visitante", info, config);

      toast.success("Registro Exitoso", {
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
      toast.error("Error al registrar visitante", {
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

  const [visitas, setVisitas] = useState([]);

  const obtenerVisitas = async () => {
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
        "/clientes/obtener-visitantes",
        config
      );

      setVisitas(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClientesContext.Provider
      value={{
        editarAsistencia,
        modalNuevoCliente,
        obtenerPlan,
        handleModalNuevoCliente,
        nuevoCliente,
        tipo,
        planes,
        nombre,
        cuit,
        emailFactura,
        cantidad,
        setTipo,
        setPlanes,
        setNombre,
        setCuit,
        setEmailFactura,
        setCantidad,
        handleModalNuevoCliente2,
        modalNuevoCliente2,
        handleBack,
        nombreUsuario,
        setNombreUsuario,
        apellidoUsuario,
        setApellidoUsuario,
        dniUsuario,
        setDniUsuario,
        emailUsuario,
        setEmailUsuario,
        celuUsuario,
        setCeluUsuario,
        handleClose,
        handleClose1,
        handleModalResumen,
        modalResumen,
        fechaVencimiento,
        setFechaVencimiento,
        handleClose3,
        handleBack2,
        guardarUsuarios,
        domicilio,
        setDomicilio,
        clientes,
        //Este usuarios se usa para mostrar en la lista de usuarios general
        usuarios,
        seleccion,
        setSeleccion,
        mostrarPlanes,
        handleModalNuevoPlan,
        modalNuevoPlan,
        handleCloseModalNuevoPlan,
        nombrePlan,
        setNombrePlan,
        descripcionPlan,
        setDescripcionPlan,
        horasSalas,
        setHorasSalas,
        precioPlan,
        setPrecioPlan,
        nuevoPlan,
        modalEditarCliente,
        handleModalEditarCliente,
        onCloseEditar,
        cuitEditar,
        setCuitEditar,
        obtenerCliente,
        editarCliente,
        setEditarCliente,
        valueProfile,
        setValueProfile,
        setFormaDePago,
        formaDePago,
        //Es lo que usaremos para grabar el usuario clieado en editar o ver
        setObtenerUs,
        //es la que usaremos para mandarle a la funcion
        obtenerUs,
        //funcion para traer el listado de usuarios en profile
        // obtenerUser,
        //Esta variable mostrara al  o los usuarios en el perfil
        obtenerUsuario,
        setObtenerUsuario,
        cargando,
        efectivo,
        setEfectivo,
        setConfiguracionDelCliente,
        configuracionDelCliente,
        conteo,
        fechaEditar,
        setFechaEditar,
        clientesRecientes,
        editarC,
        modificarPrecioPlan,
        modificarNombrePlan,
        modificarHorasSalas,
        modificarDescripcionPlan,
        setModificarPrecioPlan,
        setModificarNombrePlan,
        setModificarHorasSalas,
        setModificardescripcionPlan,
        idModificarPlan,
        handleModalModificarPlan,
        modalModificarPlan,
        handleCloseModalModificarPlan,
        editarPlan,
        isActivo,
        desactivarCliente,
        handleModalAgregarUsuario,
        modalAgregarUsuario,
        obtenerUsuarioProfile,
        almacenarAsistencia,
        idAsistencias,
        setIdAsistencias,
        obtenerAsistencias,
        asistencias,
        nombreProfileAsistencia,
        setNombreProfileAsistencia,
        planprofileAsistencias,
        setPlanProfileAsistencias,
        asistioHoyProfileAsistencias,
        setAsistioHoyProfileAsistencias,
        dataAsistencia,
        resetAsistencias,
        handleModalEditarAsistencia,
        modalEditarAsistencia,
        fechaAsistenciaModificar,
        setFechaAsistenciaModificar,
        idModificarAsistencia,
        setIdModificarAsistencia,
        eliminarAsistencia,
        modalEditarUsuario,
        handleModalEditarUsuario,
        editarUsuarios,
        idUsuarioModificar,
        setIdUsuarioModificar,
        handleEliminarUsuario,
        modalEliminarUsuario,
        eliminarUser,
        modalAdicional,
        handleModalAdicional,
        adicionales,
        obtenerAdicionales,
        adicional,
        handleModalEditarAdicional,
        modalEditarAdicional,
        descripcionAd,
        setDescripcionAd,
        importeAd,
        setImporteAd,
        notasAd,
        setNotasAd,
        idAdicionalmodificar,
        setIdAdicionalModificar,
        editarAdicional,
        modalNuevoUsuario,
        handleModalNuevoUsuario,
        nombreUSuarioNuevo,
        setNombreUsuarioNuevo,
        apellidoUSuarioNuevo,
        setApellidoUsuarioNuevo,
        emailUSuarioNuevo,
        setEmailUsuarioNuevo,
        nuevoUsuario,
        obtenerClientes,
        obtenerUsuarios,
        obtenerPlanes,
        actualizoListado,
        setActualizoListado,
        actualizoUsuarios,
        setActualizoUsuarios,
        renovarListadoAsistenciaProfile,
        setRenovarListadoAsistenciaProfile,
        nombreVisitante,
        setNombreVisitante,
        fechaNacVisitante,
        setFechaNacVisitante,
        nacionalidadVisitante,
        setNacionalidadVisitante,
        celuVisitante,
        setCeluVisitante,
        mailVisitante,
        setMailVisitante,
        motivoVisita,
        setMotivoVisita,
        dniVisitante,
        setDniVisitante,
        registrarVisitante,
        visitas,
        obtenerVisitas,
        actualizarListadoVisitante,
        setActualizarListadoVisitante,
        clientesTres,
        obtenerClientesTresVecesPorSemana,
        telefono,
        setTelefono,
        editarClientes,
        idClienteAEditar,
        setIdClienteAEditar,
        setClientes,
        handleModalNuevoUsuarioAdmin,
        nuevoUsuarioAdmin,
        rol,
        setRol,
        guardarUsuarioAdmin,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export { ClientesProvider };

export default ClientesContext;
