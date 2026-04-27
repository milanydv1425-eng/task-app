const API = 'http://localhost:5000';

export const api = {
  login: async (data: any) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  register: async (data: any) => {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getNotes: async (token: string) => {
    const res = await fetch(`${API}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },
};