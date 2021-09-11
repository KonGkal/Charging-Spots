import axios from "axios";
import { OPEN_CHARGE_MAP_API_KEY } from "@env";

const baseUrl = "https://api.openchargemap.io/v3/poi/";

export const getChargingSpots = async (
  countryCode: string,
  latitude: number,
  longitude: number
) => {
  const response = axios.get(baseUrl, {
    headers: { "X-API-Key": OPEN_CHARGE_MAP_API_KEY },
    params: {
      output: "json",
      maxresults: 100,
      compact: true,
      verbose: false,
      countryCode,
      latitude,
      longitude,
      distance: 1000,
    },
  });
  return response;
};
