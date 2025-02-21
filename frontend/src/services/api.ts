import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const loginUser = (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const getTasks = (token: string) => {
  return axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createTask = (task: { title: string; description?: string }, token: string) => {
  return axios.post(`${API_URL}/tasks`, task, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateTask = (id: number, task: { title: string; description?: string; isComplete: boolean }, token: string) => {
  return axios.put(`${API_URL}/tasks/${id}`, task, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteTask = (id: number, token: string) => {
  return axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
