import { Config } from "../Config";
import * as httpClient from "./HttpClient";

export const loginUser = async (name, password) => {
  const url = `${Config.API_URL}user/admin/login`;
  return await httpClient.post(url, { name, password });
};

export const getUsers = async () => {
  const url = `${Config.API_URL}users`;
  const response = await httpClient.get(url);
  return response;
};

export const createUser = async (data, token) => {
  const url = `${Config.API_URL}user`;
  return await httpClient.post(url, data, token);
};

export const updateUser = async (id, data, token) => {
  const url = `${Config.API_URL}user/${id}`;
  return await httpClient.put(url, data, token);
};

export const deleteUser = async (id, token) => {
  const url = `${Config.API_URL}user/${id}`;
  return await httpClient.remove(url, null, token);
};
