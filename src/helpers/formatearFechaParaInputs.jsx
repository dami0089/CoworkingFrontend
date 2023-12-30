export const formatearFechaParaInput = (fecha) => {
  try {
    // Construir una fecha en UTC basada en el string de fecha
    const [year, month, day] = fecha.split("T")[0].split("-");
    const fechaUTC = new Date(Date.UTC(year, month - 1, day));

    if (isNaN(fechaUTC.getTime())) {
      console.error("Fecha inválida:", fecha);
      return "";
    }

    // Formatear la fecha para que sea compatible con el input de tipo 'date'
    // No es necesario especificar la zona horaria ya que estamos construyendo la fecha en UTC
    return fechaUTC.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error al formatear fecha para input:", error);
    return "";
  }
};
