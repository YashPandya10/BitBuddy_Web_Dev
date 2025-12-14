import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import GoogleMapsProvider from "./components/GoogleMapsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BiteBuddy - Food Sharing App",
  description: "Share food with your community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <GoogleMapsProvider>
            <Navbar />
            {children}
          </GoogleMapsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}