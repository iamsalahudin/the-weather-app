"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useWeatherData(city) {
  const api_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const { data, error } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${api_key}&units=metric`,
    fetcher,
    {
      refreshInterval: 600000, // Auto-refresh every 10 minutes
      revalidateOnFocus: false, // Prevent refetching when user switches back to tab
      dedupingInterval: 300000, // Cache data for 5 minutes before refetching
    }
  );

  return {
    weather: data,
    isLoading: !data && !error,
    isError: error,
  };
}
