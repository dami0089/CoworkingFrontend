import { format, parseISO, isValid } from "date-fns";
import { es } from "date-fns/locale";

export const formatearFecha = (fecha) => {
  try {
    const parsedDate = parseISO(fecha);
    if (!isValid(parsedDate)) {
      console.error("Fecha inválida:", fecha);
      return "";
    }
    // Formatear la fecha para que sea compatible con el input de tipo 'date'
    return format(parsedDate, "yyyy-MM-dd");
  } catch (error) {
    console.error("Error al formatear fecha para input:", error);
    return "";
  }
};
