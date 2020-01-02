import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL;
if (typeof window !== "undefined")
  axios.defaults.headers.common["Authorization"] =  localStorage.getItem("token");

export class Requests {
  static async get<T>(url) {
    const response = await axios.get<T>(url);
    return response.data;
  }

  static async post<T>(url, data) {
    const response = await axios.post<T>(url, data);
    return response.data;
  }

  static async put<T>(url, data) {
    const response = await axios.put<T>(url, data, {withCredentials: true});
    return response.data;
  }

  static async delete<T>(url) {
    const response = await axios.delete(url);
    return response.data;
  }

  //Checks to see if authorization header has been set yet.
  static isReady() {
    return axios.defaults.headers.common["Authorization"] !== "Bearer null" &&
      axios.defaults.headers.common["Authorization"] !== undefined &&
      axios.defaults.headers.common["Authorization"] !== null
  }
}