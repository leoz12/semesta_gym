import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

export const api = {
  token: localStorage.getItem('token'),

  setToken(token: string) {
    this.token = token;
  },

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
    };
  },

  async get(endpoint: string) {
    try {
      const response = await axios.get(`${BASE_URL}/api${endpoint}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error('API request failed');
    }
  },

  async post(endpoint: string, data: any, headers: any = {}) {
    try {
      const response = await axios.post(`${BASE_URL}/api${endpoint}`, data, {
        headers: { ...this.getHeaders(), ...headers.headers },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      throw new Error('API request failed');
    }
  },

  async put(endpoint: string, data: any, headers: any = {}) {
    try {
      const response = await axios.put(`${BASE_URL}/api${endpoint}`, data, {
        headers: { ...this.getHeaders(), ...headers.headers },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      throw new Error('API request failed');
    }
  },

  async delete(endpoint: string) {
    try {
      const response = await axios.delete(`${BASE_URL}/api${endpoint}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      throw new Error('API request failed');
    }
  },
};