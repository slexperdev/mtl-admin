import { Config } from "../Config";
import * as httpClient from "./HttpClient";

export const getDepartments = async () => {
  const url = `${Config.API_URL}department`;
  const response = await httpClient.get(url);
  return response;
};

export const createDepartment = async (data, token) => {
  const url = `${Config.API_URL}department`;
  return await httpClient.post(url, data, token);
};

export const updateDepartment = async (id, data, token) => {
  const url = `${Config.API_URL}department/${id}`;
  return await httpClient.put(url, data, token);
};

export const deleteDepartment = async (id, token) => {
  const url = `${Config.API_URL}department/${id}`;
  return await httpClient.remove(url, null, token);
};
