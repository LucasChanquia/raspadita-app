import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";

const inter = Pixelify_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raspadita App",
  icons:{
    icon:'/Icon.ico',
    shortcut:'/Icon.ico',
    apple:'/Icon.ico'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
