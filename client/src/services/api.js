import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

export const signupUser = (name, email, password) => {
  return API.post('/signup', { name, email, password });
};

export const loginUser = (email, password) => {
  return API.post('/login', { email, password });
};

export const createTaskUser = (taskData) =>{
  return API.post('/createTask',taskData)
}
