"use client";

import { useEffect, useState } from "react";
import WaitDisplay from "./(components)/WaitDisplay";
import SearchForm from "./(components)/SearchForm";
import { WeatherInfo } from "./(components)/WeatherInfo";
import { useWeatherData } from "@/hooks/useWeather";

export default function Home() {
  const [citiesData, setCitiesData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Lahore");
  const [selectedState, setSelectedState] = useState("Punjab");
  const [selectedCountry, setSelectedCountry] = useState("PK");
  const [bgURL, setBgURL] = useState("/images/10d.jpg");
  const { weather, isLoading, isError } = useWeatherData({
    city: selectedCity || "Lahore",
    state: selectedState || undefined
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/data/cities.json")
      .then((res) => res.json())
      .then((data) => setCitiesData(data))
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  useEffect(() => {
    const thisCity = citiesData.find((city) => city.name == selectedCity);
    setSelectedState(thisCity?.state || undefined);
    setSelectedCountry(thisCity?.country);

    if (weather?.icon)
      setBgURL(`/images/${weather.icon}.jpg`);
  }, [weather, selectedCity, citiesData]);

  if (isError)
    return (
      <WaitDisplay type="error" data="Server Error... Please Try again Later" />
    );
  if (isLoading)
    return <WaitDisplay type="fetch" data="Fetching data... Please Wait" />;

  return (
    <div
      className={`flex sm:py-10 py-3 px-5 items-center justify-center w-screen h-screen overflow-hidden bg-top bg-cover bg-no-repeattransition-opacity duration-700 ${
        bgURL ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${bgURL})` }}
    >
      <main className="isolate px-2 py-5 w-full h-full flex flex-col items-center justify-evenly rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 text-white">
        <WeatherInfo
          cityData={weather}
          showForm={showForm}
          setShowForm={setShowForm}
        />
        <SearchForm
          showForm={showForm}
          setShowForm={setShowForm}
          setSelectedCity={setSelectedCity}
          selectedCity={selectedCity}
          setSelectedCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
          citiesData={citiesData}
        />
      </main>
    </div>
  );
}
