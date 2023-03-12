import axios from "axios";
import { getToken } from "../utils/token";

const API_BASE_URL = "http://localhost:8000/api";

const getAxiosConfig = () => {
  const token = getToken();
  if (!token) {
    return null;
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };
};

const handleAxiosError = (error) => {
  console.error(error);
  return null;
};

const getApiEndpointUrl = (endpoint) => `${API_BASE_URL}/${endpoint}`;

export async function getAllUsers() {
  try {
    const response = await axios.get(getApiEndpointUrl("users/all"), getAxiosConfig());
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export async function getUser(id = null) {
  try {
    const url = id ? `users/${id}` : 'users';
    const response = await axios.get(getApiEndpointUrl(url), getAxiosConfig());
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export async function deleteUser(id) {
  try {
    const response = await axios.delete(getApiEndpointUrl(`users/${id}`), getAxiosConfig());
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export async function updateUser(data) {
  try {
    const response = await axios.put(getApiEndpointUrl(`users/${data._id}`), data, getAxiosConfig());
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};