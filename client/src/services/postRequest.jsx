import axios from "axios";
import { getToken } from "../utils/token";

const token = getToken();
const API_BASE_URL = "http://localhost:8000/api";

const getAxiosConfig = () => {
  
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

export async function createPost(post) {
  try {
    const response = await axios.post(getApiEndpointUrl("posts/create"), post, getAxiosConfig());
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export async function getAllPosts() {
  try {
    const response = await axios.get(getApiEndpointUrl(`posts/all`), getAxiosConfig());
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export async function getPost(id) {
  try {
    const response = await axios.get(getApiEndpointUrl(`posts/${id}`), getAxiosConfig());
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export async function deletePost(data) {
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
    const response = await axios.delete(getApiEndpointUrl(`posts/${data._id}`), configDelete);
    return response.data;
  } catch (error) {
    console.log(error)
    return handleAxiosError(error);
  }
};

export async function updatePost(id, data, like = null) {
  try {
    let link = `posts/${id}`;
    if(like !== null){
      link = `posts/like/${id}`
    }
    console.log(link);
    const response = await axios.put(getApiEndpointUrl(link), data, getAxiosConfig());
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};