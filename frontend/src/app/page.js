import Image from "next/image";
import styles from "./page.module.css";
import './globals.css';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/components/api';
import Checklogin from '@/components/Checklogin';

export default function Home() {
  Checklogin();
  return null;
}
