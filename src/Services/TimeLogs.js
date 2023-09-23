import { Config } from "../Config";
import * as httpClient from "./HttpClient";

export const getTimeLogs = async () => {
  const url = `${Config.API_URL}timeLog`;
  const response = await httpClient.get(url);
  return response;
};

export const getAllTimeLogs = async (page, token) => {
  const url = `${Config.API_URL}timeLog/all`;
  const response = await httpClient.post(url, { page }, token);
  return response;
};

export const pauseTime = async (id, data, token) => {
  const url = `${Config.API_URL}pauseStartTimerById/${id}`;
  const response = await httpClient.post(url, data, token);
  return response;
};
