const BASE_URL = 'http://localhost:8080/api/VPS';

export const VpsApi = {
  async getVps() {
    const response = await fetch(`${BASE_URL}/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  },
  async getVpsById(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  },
};
