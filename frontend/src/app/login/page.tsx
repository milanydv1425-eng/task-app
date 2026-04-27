'use client';

import { useState } from 'react';
import { api } from '@/services/api';
import { setToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await api.login({ email, password });
    setToken(res.token);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-4">

      <div className="w-full max-w-md p-10 bg-white border border-[#e5e2dc]">

        {/* title */}
        <h2
          className="text-3xl mb-8 text-center font-light"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Welcome Back
        </h2>

        {/* inputs */}
        <input
          className="w-full mb-4 p-3 border border-[#d6d3ce] bg-transparent focus:outline-none focus:border-[#c6a76e]"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-6 p-3 border border-[#d6d3ce] bg-transparent focus:outline-none focus:border-[#c6a76e]"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        {/* button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-[#c6a76e] text-white tracking-wide hover:opacity-90 transition"
        >
          Login
        </button>

        {/* divider */}
        <div className="w-12 h-[1px] bg-[#c6a76e] mx-auto my-6 opacity-60" />

        {/* link */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <span
            onClick={() => router.push('/register')}
            className="text-[#c6a76e] cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}