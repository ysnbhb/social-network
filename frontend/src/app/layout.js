import Navbar from '../components/navbar.js';
import { ContextProvider } from '../lib/Context.js';
import "./globals.css";

export default function RootLayout({ children }) {
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
