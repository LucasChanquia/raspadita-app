import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";

const inter = Pixelify_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raspadita App",
  icons:{
    icon:'../../public/image/icon.ico',
    shortcut:'../../public/image/icon.ico',
    apple:'../../public/image/icon.ico'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
