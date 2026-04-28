const API = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  login: async (data: any) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return null; // 👈 important
    }

    return res.json();
  },

  register: async (data: any) => {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  },

  getNotes: async (token: string) => {
    const res = await fetch(`${API}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return { data: [] };
    }

    return res.json();
  },
};