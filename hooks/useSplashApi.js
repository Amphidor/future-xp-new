// hooks/useSplashApi.js
import axios from "axios";

const API_URL = "/api/splashes"; // adjust backend URL

export const getSplashes = async () => {
  const res = await axios.get("/api/splashes", {
    params: { isWeb: true }  // if admin page
  });

  return res.data.splashes || [];  // <-- FIXED
};

export const createSplash = (data) => axios.post(API_URL, data).then(res => res.data);
export const updateSplash = (id, data) => axios.put(`${API_URL}/${id}`, data).then(res => res.data);
export const deleteSplash = (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data);

// ⭐ Needed for drag & drop reorder
export const reorderSplashes = (data) =>
  axios.put(`${API_URL}/reorder`, data).then(res => res.data);

export const toggleSplashStatus = (id, status) =>
  axios.put(`/api/splashes/${id}`, { isActive: status }).then(res => res.data);
