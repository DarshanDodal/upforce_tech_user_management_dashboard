import axios from "axios";

export const baseURL = "https://api.darshandodal.online/api"; // Replace with your backend API base URL

export const url = "https://api.darshandodal.online/";
const api = axios.create({
  baseURL,
});

const apiEndpoints = {
  createUser: "/users",
  getAllUsers: "/users",
  editUser: "/users/:userId",
  deleteUser: "/users/:userId",
  searchUsers: "/users/search",
  exportUsersToCSV: "/users/export/csv",
};

export const createUser = async (userData) => {
  try {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      // Append all fields except 'profileImage'
      if (key !== "profileImage") {
        formData.append(key, value);
      }
    });

    // Append the file
    if (userData.profileImage) {
      formData.append("profileImage", userData.profileImage);
    }

    const response = await api.post(apiEndpoints.createUser, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const editUser = async (userId, userData) => {
  try {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const url = apiEndpoints.editUser.replace(":userId", userId);
    const response = await api.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get(apiEndpoints.getAllUsers);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (userId) => {
  try {
    const url = apiEndpoints.deleteUser.replace(":userId", userId);
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await api.get(apiEndpoints.searchUsers, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const exportUsersToCSV = async () => {
  try {
    const response = await api.get(apiEndpoints.exportUsersToCSV, {
      responseType: "blob", // Set response type to blob to receive binary data
    });
    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    window.open(url); // Open CSV file in a new tab
  } catch (error) {
    throw error.response.data;
  }
};

export default api;
