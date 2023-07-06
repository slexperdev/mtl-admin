import { Config } from "../Config";
import * as httpClient from "./HttpClient";

export const getProjects = async () => {
  const url = `${Config.API_URL}projects`;
  const response = await httpClient.get(url);
  return response;
};

export const createProject = async (data, token) => {
  const url = `${Config.API_URL}project`;
  return await httpClient.post(url, data, token);
};

export const updateProject = async (id, data, token) => {
  const url = `${Config.API_URL}project/${id}`;
  return await httpClient.put(url, data, token);
};

export const deleteProject = async (id, token) => {
  const url = `${Config.API_URL}project/${id}`;
  return await httpClient.remove(url, null, token);
};
