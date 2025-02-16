"use client";

import Link from "./link";
const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">🚀 My App</h1>
      <div className="space-x-4">
        <Link href="/">🏠 Home</Link>
        <Link href="/profile">👤 Profile</Link>
        <Link href="/settings">⚙️ Settings</Link>
        <Link href="/auth/login">🔑 Login</Link>
        <Link href="/auth/register">📝 Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
