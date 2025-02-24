import { Connectwebsocket } from "../websocket/websocket.js";
import Navbar from '../components/navbar.js';
import "./globals.css";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Connectwebsocket />
        <div>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
