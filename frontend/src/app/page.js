"use client";
import { useEffect } from 'react';
import './globals.css';

export default function Home() {
  useEffect(() => {
    window.location.href = '/login';
  }, []);
  

  return null;
}
