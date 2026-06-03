import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "World GEN | El Primer Consorcio de la Industria",
  description: "El nuevo mundo para la nueva generación. Conoce nuestras marcas, premios y alianzas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#040316] text-white selection:bg-[#5c64f2]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
