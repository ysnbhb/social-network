 
 import Navbar from "../../components/navbar.js";
import { ContextProvider } from "../../lib/Context.js";
 import "../globals.css";
 export default function RootLayout({ children }) { 
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}