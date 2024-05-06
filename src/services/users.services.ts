import { axiosInstance } from "@/config/AxiosConfig";

export const getAllUsers = async () => {
  const response = axiosInstance.get(`/api/users`);
  return response;
};

export const getSpesisficUser = async (id: string) => {
  const response = axiosInstance.get(`/api/users/${id}`);
  return response;
};

export const addUser = async (data: { name: string; gender: string }) => {
  const response = axiosInstance.post(`/api/users`, data);
  return response;
};

export const deleteUser = async (id: string) => {
  const response = axiosInstance.delete(`/api/users/${id}`);
  return response;
};

export const editUser = async (
  id: string,
  data: { name: string; gender: string }
) => {
  const response = axiosInstance.put(`/api/users/${id}`, data);
  return response;
};
