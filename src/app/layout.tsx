import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ThemeSwitch from "@/components/ThemeSwitch";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Oprec Quadcopter 2024",
    description: "Form Submit new quadcpter member ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                    <ThemeSwitch />
                    <Footer />
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
