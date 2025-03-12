"use client";
import { useEffect } from 'react';
import './globals.css';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/components/api';
import Checklogin from '@/components/Checklogin';

export default function Home() {
  Checklogin();
  return null;
}
