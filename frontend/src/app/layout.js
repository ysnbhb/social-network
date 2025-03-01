"use client";
import { useEffect } from 'react';
import { initializeWebSocket } from "../websocket/websocket.js";
import Navbar from '../components/navbar.js';
import { ContextProvider } from '../lib/Context.js';
import "./globals.css";

export default function RootLayout({ children }) {
  useEffect(() => {
    // Initialize websocket connection when the app loads
    initializeWebSocket().catch(error => {
      console.error("Failed to initialize websocket in layout:", error);
    });
  }, []);

  return (
    <html lang="en">
      <body>
        <div>
        <ContextProvider >
        {children}
        </ContextProvider>
        </div>
      </body>
    </html>
  );
}