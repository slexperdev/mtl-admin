import { Config } from "../Config";
import * as httpClient from "./HttpClient";

export const getIncentive = async () => {
  const url = `${Config.API_URL}timeLog/incentive`;
  const response = await httpClient.get(url);
  return response;
};

export const createIncentive = async (data, token) => {
  const url = `${Config.API_URL}project`;
  return await httpClient.post(url, data, token);
};

export const updateIncentive = async (id, data, token) => {
  const url = `${Config.API_URL}project/${id}`;
  return await httpClient.put(url, data, token);
};

export const deleteIncentive = async (id, token) => {
  const url = `${Config.API_URL}project/${id}`;
  return await httpClient.remove(url, null, token);
};
