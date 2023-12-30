import { format, parseISO, isValid } from "date-fns";
import { es } from "date-fns/locale";

export const formatearFecha = (fecha) => {
  try {
    const parsedDate = parseISO(fecha);
    if (!isValid(parsedDate)) {
      console.error("Fecha inválida:", fecha);
      return "";
    }
    // Formatear la fecha en el formato dd/mm/yyyy
    return format(parsedDate, "dd/MM/yyyy", { locale: es });
  } catch (error) {
    console.error("Error al formatear fecha:", error);
    return "";
  }
};
