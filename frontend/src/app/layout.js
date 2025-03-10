"use client";
import { useEffect } from 'react'; 
import { ContextProvider } from '../lib/Context.js';
import "./globals.css";

export default function RootLayout({ children }) {
  useEffect(() => {
    document.body.setAttribute('cz-shortcut-listen', 'true');
    return () => {
      document.body.removeAttribute('cz-shortcut-listen');
    };
  }, []);
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div>
        <ContextProvider >
        {children}
        </ContextProvider>
        </div>
      </body>
    </html>
  );
}