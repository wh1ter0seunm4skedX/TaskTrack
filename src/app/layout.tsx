import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Local font (Geist) for additional use
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Todo-List App :)",
    description: "Here is my cool app for you to check",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} antialiased`}
            style={{ fontFamily: "var(--font-primary)" }}
        >
        {children}
        </body>
        </html>
    );
}
