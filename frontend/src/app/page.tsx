'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#1a1a1a] relative overflow-hidden">

      {/* subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#c6a76e 1px, transparent 1px), linear-gradient(90deg, #c6a76e 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* NAV */}
      <div className="max-w-6xl mx-auto flex justify-between items-center py-6 px-6">
        <h1 className="text-lg tracking-[0.3em] font-semibold">
          NOTES
        </h1>

        <div className="flex gap-8 text-sm tracking-wide">
          <Link href="/login" className="hover:text-[#c6a76e] transition">
            Login
          </Link>
          <Link href="/register" className="hover:text-[#c6a76e] transition">
            Register
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div className="flex items-center justify-center text-center px-6 mt-24">
        <div className="max-w-2xl">

          <h1
            className="text-5xl md:text-6xl font-light leading-tight mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Organize Your{" "}
            <span className="text-[#c6a76e]">Life</span> <br />
            With Clarity
          </h1>

          <p className="text-gray-500 text-lg mb-10">
            A refined way to manage notes and tasks — minimal, structured,
            and built for focus.
          </p>

          <div className="flex gap-4 justify-center">

            <Link
              href="/register"
              className="px-8 py-3 bg-[#c6a76e] text-white tracking-wide text-sm rounded-sm hover:opacity-90 transition"
            >
              Get Started
            </Link>

            

          </div>

          {/* divider */}
          <div className="w-16 h-[1px] bg-[#c6a76e] mx-auto my-10 opacity-60" />

          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase">
            Minimal · Elegant · Functional
          </p>

        </div>
      </div>
    </div>
  );
}