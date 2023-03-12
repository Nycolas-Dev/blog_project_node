import axios from "axios";
import { getToken } from "../utils/token";
const token = getToken();

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

export async function createComment(comment) {
  try {
    console.log(comment)
    const response = await axios.post(getApiEndpointUrl("comments/create"), comment, getAxiosConfig());
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export async function getComments(idPost) {
  try {
    const response = await axios.get(getApiEndpointUrl(`comments/all/${idPost}`), getAxiosConfig());
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export async function deleteComment(data) {
  try {
    const configDelete = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data: {
        data
      },
    }
    const response = await axios.delete(getApiEndpointUrl(`comments/${data._id}`), configDelete);
    return response.data;
  } catch (error) {
    console.log(error)
    return handleAxiosError(error);
  }
};

export async function updateComment(id) {
  try {
    const response = await axios.put(getApiEndpointUrl(`comments/${id}`), getAxiosConfig());
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};