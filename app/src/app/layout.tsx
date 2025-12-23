// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import BootstrapClient from "@/components/BootstrapClient";
import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { AutoRefreshWrapper } from "@/components/auth/ AutoRefreshWrapper";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard - Sistema de Gestão",
  description: "Painel administrativo para gestão completa da plataforma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <AuthProvider>
            <AutoRefreshWrapper>
               <ReactQueryProvider>
              {children}
              </ReactQueryProvider>
            </AutoRefreshWrapper>
          </AuthProvider>
          <BootstrapClient />
        </ThemeProvider>
      </body>
    </html>
  );
}
