import { useEffect, useState } from "react"
const apiKey = import.meta.env.VITE_API_KEY_CLIMA;
const ciudad = "Tucuman";

function ObtenerClimaTucuman() {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ciudad}&aqi=no`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setClima(data);
        setCargando(false);
      })
      .catch(error => {
        console.log("Error al obtener el clima:", error);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando el clima...</p>;
  }

  if (!clima) {
    return <p>No se pudo cargar el clima.</p>;
  }

  return (
    <div>
      <h2>Clima en {clima.location.name}</h2>
      <p>Temperatura: {clima.current.temp_c} °C
      <img src={clima.current.condition.icon} alt="Icono del clima"/>
      </p>
    </div>
  );
}

export default ObtenerClimaTucuman