import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

export default function SearchForm({
  showForm,
  setShowForm,
  setSelectedCity,
  selectedCity,
  setSelectedCountry,
  selectedCountry,
  citiesData,
}) {
  const [selectedCities, setSelectedCities] = useState([]);
  const countries = ["PK", "IN", "US", "GB", "DE", "AU", "CN", "SA"];
  const cityInputRef = useRef(null);
  const citySelectRef = useRef(null);
  const quickCities = [
    "Washington",
    "Paris",
    "Tokyo",
    "London",
    "Berlin",
    "Rome",
    "Mumbai",
    "Lahore",
    "Karachi",
    "Islamabad",
    "Mecca",
    "Medina",
  ];

  useEffect(() => {
    setSelectedCities(
      citiesData.filter((city) => city.country === selectedCountry)
    );
  }, [selectedCountry, citiesData]);

  return (
    <div
      className={`absolute top-0 left-0 isolate p-5 w-screen h-screen overflow-hidden ${
        showForm ? "flex" : "hidden"
      } flex-col space-y-3 bg-black/70 shadow-lg ring-1 ring-black/5 text-white drop-shadow-lg`}
    >
      <button
        className="right-5 top-5 absolute text-2xl"
        onClick={() => setShowForm(!showForm)}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <p className="text-4xl font-bold">Either</p>
      <form className="flex flex-col space-y-2">
        <label className="text-xl text-gray-200">Search by City Name:</label>
        <input
          type="text"
          className="w-full border border-white rounded-lg px-3 py-1"
          ref={cityInputRef}
        />
        <div className="flex space-x-3 flex-wrap">
          {quickCities.map((city, index) => {
            return (
              <span
                title={city}
                key={index}
                className="text-orange-400 cursor-pointer"
                onClick={(e) => (cityInputRef.current.value = e.target.title)}
              >
                {city}
              </span>
            );
          })}
        </div>
        <button
          type="submit"
          className="w-20 px-3 py-2 bg-white font-bold text-black rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            setShowForm(!showForm);
            if (cityInputRef.current.value)
              setSelectedCity(cityInputRef.current.value);
            cityInputRef.current.value = "";
            citySelectRef.current.value = "";
          }}
        >
          Search
        </button>
      </form>
      <p className="text-4xl font-bold">Or</p>
      <form className="flex flex-col space-y-2">
        <div className="flex space-x-3">
          <select
            className="border border-white rounded-lg p-2 outline-none"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map((country, index) => {
              return (
                <option
                  value={country}
                  key={index}
                  className="bg-black/90 outline-none"
                >
                  {country}
                </option>
              );
            })}
          </select>
          <select
            className="border border-white rounded-lg p-2 outline-none"
            value={selectedCity}
            onChange={(e) => {
              e.preventDefault();
              setShowForm(!showForm);
              setSelectedCity(e.target.value);
              cityInputRef.current.value = "";
              citySelectRef.current.value = "";
            }}
            ref={citySelectRef}
          >
            {selectedCities.length === 0 ? (
              <option disabled>No cities available</option>
            ) : (
              selectedCities.map((city) => (
                <option
                  key={city.id}
                  value={city.name}
                  className="bg-black/90 outline-none"
                >
                  {city.name}
                </option>
              ))
            )}
          </select>
        </div>
      </form>
    </div>
  );
}
