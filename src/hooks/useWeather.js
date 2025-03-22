"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useWeatherData({ city, state }) {
  const api_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const [newData, setNewData] = useState({});

  const { data, error } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${api_key}&units=metric`,
    fetcher,
    {
      refreshInterval: 600000, // Auto-refresh every 10 minutes
      revalidateOnFocus: false, // Prevent refetching when user switches back to tab
      dedupingInterval: 300000, // Cache data for 5 minutes before refetching
    }
  );

  useEffect(() => {
    if (data)
      setNewData({
        id: data.weather[0].id,
        city: data.name,
        state: state,
        country: data.sys.country,
        lon: data.coord.lon,
        lat: data.coord.lat,
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      });
  }, [data] );
  console.log(data);
  console.log(newData);

  return {
    weather: newData,
    isLoading: !data && !error,
    isError: error,
  };
}
