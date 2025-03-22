import { faPen, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const WeatherInfo = ({
  showForm,
  setShowForm,
  cityData
}) => {
  const sunrise = cityData?.sunrise
    ? new Date(cityData.sunrise * 1000).toLocaleTimeString("en-US", {
        hour12: true,
      })
    : "N/A";
  const sunset = cityData?.sunset
    ? new Date(cityData.sunset * 1000).toLocaleTimeString("en-US", {
        hour12: true,
      })
    : "N/A";
  return (
    <>
      <h1 className="text-center sm:text-6xl text-4xl font-bold drop-shadow-lg">
        The Weather App
      </h1>
      <h2 className="text-center text-xl flex items-start space-x-1 font-bold pt-2 drop-shadow-lg">
        <FontAwesomeIcon icon={faLocationDot} className="w-4 drop-shadow-lg" />
        <span className="drop-shadow-lg">
          {cityData?.city && `${cityData?.city}`}
          {cityData?.state && `, ${cityData?.state}`}
          {cityData?.country && `, ${cityData?.country}`}
        </span>
        <button
          className="drop-shadow-lg"
          title="Click to search city"
          onClick={() => setShowForm(!showForm)}
        >
          <FontAwesomeIcon icon={faPen} className="w-4 pt-1 drop-shadow-lg" />
        </button>
      </h2>
      <p className="text-orange-400">
        Lon {cityData?.lon} | Lat {cityData?.lat}
      </p>
      <div className="flex flex-col justify-center items-center drop-shadow-lg">
        <Image
          src={`https://openweathermap.org/img/wn/${
            cityData?.icon || "01d"
          }@2x.png`}
          alt={cityData?.description || "Weather Icon"}
          width={100}
          height={100}
          priority={false}
          loading="lazy"
          unoptimized
          className=" drop-shadow-lg"
        />
        <h2 className="text-center text-3xl font-bold">
          {cityData?.main || "N/A"}
        </h2>
        <p>{cityData?.description || "N/A"}</p>
      </div>
      <p className="flex flex-col items-center justify-center drop-shadow-lg">
        <span className="text-3xl font-bold">
          {cityData?.temp || "N/A"}&#176;C
        </span>
        <span>feels like {cityData?.feels_like || "N/A"}&#176;C</span>
      </p>
      <div className="w-full sm:w-auto p-5 text-lg flex sm:flex-row flex-col sm:space-y-0 space-y-2 sm:space-x-2 space-x-0 drop-shadow-lg">
        <p className="flex sm:flex-col items-center justify-between rounded-xl shadow-md sm:p-2 py-1 px-3">
          <span className="sm:font-bold">Temp. Max</span>
          <span>{cityData?.temp_max || "N/A"}&#176;C</span>
        </p>
        <p className="flex sm:flex-col items-center justify-between rounded-xl shadow-md sm:p-2 py-1 px-3">
          <span className="sm:font-bold">Temp. Min</span>
          <span>{cityData?.temp_min || "N/A"}&#176;C</span>
        </p>
        <p className="flex sm:flex-col items-center justify-between rounded-xl shadow-md sm:p-2 py-1 px-3">
          <span className="sm:font-bold">Humidity</span>
          <span>{cityData?.humidity || "N/A"}%</span>
        </p>
        <p className="flex sm:flex-col items-center justify-between rounded-xl shadow-md sm:p-2 py-1 px-3">
          <span className="sm:font-bold">Wind</span>
          <span>{cityData?.wind_speed || "N/A"} m/s</span>
        </p>
        <p className="flex sm:flex-col items-center justify-between rounded-xl shadow-md sm:p-2 py-1 px-3">
          <span className="sm:font-bold">Pressure</span>
          <span>{cityData?.pressure || "N/A"} hPa</span>
        </p>
      </div>
      <p className="flex items-center justify-center space-x-1">
        <Image
          src="/images/sunrise.png"
          alt="sunrise icon"
          width={30}
          height={30}
          priority={false}
          loading="lazy"
          className=" drop-shadow-lg"
        />
        <span>{sunrise}</span>
        <Image
          src="/images/sunset.png"
          alt="sunset icon"
          width={30}
          height={30}
          priority={false}
          loading="lazy"
          className=" drop-shadow-lg"
        />
        <span>{sunset}</span>
      </p>
    </>
  );
};
