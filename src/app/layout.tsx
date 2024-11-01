import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/components/ReduxProvider";


const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white`}>
        <main className="flex flex-col min-h-screen h-screen">
          <ReduxProvider> 
  
          {children}
       
          </ReduxProvider>
        </main>
        <Toaster position="bottom-right" toastOptions={{duration:2500}}/>
      </body>
    </html>
  );
}
