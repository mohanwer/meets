import axios from 'axios';

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
    const response = await axios.put<T>(url, data);
    return response.data;
  }

  static async delete<T>(url) {
    const response = await axios.delete(url);
    return response.data;
  }

  static setToken(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  //Checks to see if authorization header has been set yet.
  static isReady() {
    return axios.defaults.headers.common["Authorization"] !== "Bearer null" &&
      axios.defaults.headers.common["Authorization"] !== undefined &&
      axios.defaults.headers.common["Authorization"] !== null
  }
}

//Todo: get this value from ssm
axios.defaults.baseURL = 'https://j5lnxoobxi.execute-api.us-east-2.amazonaws.com/Test';
if (typeof window !== "undefined") {
  Requests.setToken(`Bearer ${localStorage.getItem("access_token")}`)
}
axios.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";