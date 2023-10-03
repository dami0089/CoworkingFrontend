import React, { useState, useEffect, useRef } from "react";
import { BrowserPDF417Reader } from "@zxing/library";
import { Button, Typography } from "@material-tailwind/react";
import useClientes from "@/hooks/useClientes";
import ListadoDeVisitantes from "./ListadoDeVisitantes";
import { ToastContainer } from "react-toastify";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const RegistrarClientes = () => {
  const {
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
    setSeleccion,
    setActualizarListadoVisitante,
  } = useClientes();
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null); // Referencia para el elemento video
  const codeReader = new BrowserPDF417Reader();

  useEffect(() => {
    if (isScanning) {
      // Iniciar el escaneo al montar el componente
      codeReader
        .decodeFromInputVideoDevice(undefined, videoRef.current)
        .then((result) => {
          //   setData(result.getText());
          console.log(result);
          extractData(result.getText());
          setIsScanning(false); // Detener el escaneo después de obtener un resultado
        })
        .catch((err) => {
          setError(err.message);
        });

      // Limpiar y detener el escaneo al desmontar el componente
      return () => {
        codeReader.reset();
      };
    }
  }, [isScanning, codeReader]);

  const extractData = (rawData) => {
    const segments = rawData.split("@");
    const fechaRaw = segments[7].split("/");
    const fechaFormatted = `${fechaRaw[2]}-${fechaRaw[1].padStart(
      2,
      "0"
    )}-${fechaRaw[0].padStart(2, "0")}`; // Convertir de DD/MM/YYYY a YYYY-MM-DD
    setDniVisitante(segments[1]);
    setNombreVisitante(segments[4] + " " + segments[5]);
    setFechaNacVisitante(fechaFormatted);
    setNacionalidadVisitante(segments[6]);
  };

  //   const extractedData = data ? extractData(data) : {};

  const handleSubmit = async (e) => {
    await registrarVisitante(
      nombreVisitante,
      dniVisitante,
      nacionalidadVisitante,
      fechaNacVisitante,
      celuVisitante,
      mailVisitante,
      motivoVisita
    );
    setNombreVisitante("");
    setDniVisitante("");
    setNacionalidadVisitante("");
    setCeluVisitante("");
    setMailVisitante("");
    setMotivoVisita("");
    setActualizarListadoVisitante(true);
  };

  const handleScan = (e) => {
    e.preventDefault();
    if (isScanning) {
      setIsScanning(false);
      setError("");
    } else {
      setIsScanning(true);
    }
  };

  return (
    <>
      <div className="ml-3 mt-3">
        <button
          type="button"
          className="bg-red rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={(e) => setSeleccion(1)}
        >
          <ArrowLeftCircleIcon />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          ></svg>
        </button>
      </div>
      <div className="flex">
        <ToastContainer pauseOnFocusLoss={false} />

        {/* Sección Izquierda */}
        <div className="flex flex-1 flex-col items-center justify-between border-r p-4">
          {isScanning ? (
            <video ref={videoRef} className="h-full w-full"></video>
          ) : (
            <img
              src="../../../public/img/scan.svg"
              alt="Placeholder SVG"
              className="mb-auto h-2/3 w-2/3"
            />
          )}
          <button
            onClick={(e) => handleScan(e)}
            className="mt-3 rounded bg-blue-500 py-1 px-3 font-bold text-white hover:bg-blue-700"
          >
            Scan DNI
          </button>
        </div>

        {/* Sección Derecha */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h6 className="mb-3 text-xl">Datos del Visitante</h6>
            <div className="mb-2">
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Nombre:
              </label>
              <input
                type="text"
                value={nombreVisitante}
                onChange={(e) => setNombreVisitante(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border py-1 px-2 uppercase text-gray-700 shadow focus:outline-none"
              />
            </div>
            <div className="flex space-x-4">
              <div className="mb-2 w-1/3">
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  DNI:
                </label>
                <input
                  type="text"
                  value={dniVisitante}
                  onChange={(e) => setDniVisitante(e.target.value.trim())}
                  className="focus:shadow-outline w-full appearance-none rounded border py-1 px-2 text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="mb-2 w-1/3">
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Nacionalidad:
                </label>
                <input
                  type="text"
                  value={nacionalidadVisitante}
                  onChange={(e) => setNacionalidadVisitante(e.target.value)}
                  className="focus:shadow-outline w-full appearance-none rounded border py-1 px-2 text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="mb-2 w-1/3">
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  value={fechaNacVisitante}
                  onChange={(e) => setFechaNacVisitante(e.target.value)}
                  className="focus:shadow-outline w-full appearance-none rounded border py-1 px-2 text-gray-700 shadow focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Celular:
              </label>
              <input
                type="text"
                value={celuVisitante}
                onChange={(e) => setCeluVisitante(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border py-1 px-2 text-gray-700 shadow focus:outline-none"
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Email:
              </label>
              <input
                type="text"
                value={mailVisitante}
                onChange={(e) => setMailVisitante(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border py-1 px-2 text-gray-700 shadow focus:outline-none"
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Motivo de la visita:
              </label>
              <select
                value={motivoVisita}
                onChange={(e) => setMotivoVisita(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border py-1 px-2 text-gray-700 shadow focus:outline-none"
              >
                <option value="">--Seleccionar--</option>
                <option value="Pase diario">Pase diario</option>
                <option value="Visitante de sala">Visitante de sala</option>
                <option value="Otro motivo">Otro motivo</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={(e) => handleSubmit(e)}
              className=" mt-5 rounded bg-blue-500 py-1 px-3 font-bold text-white hover:bg-blue-700"
            >
              Registrar Visitante
            </button>
          </div>
        </div>
      </div>
      <ListadoDeVisitantes />
    </>
  );
};

export default RegistrarClientes;
