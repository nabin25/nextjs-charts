import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Navbar from "@/components/navbar/nav-bar";
import { ThemeProvider } from "@/providers/theme-provider";
import LoadingOverlay from "@/components/loading-overlay";
import { LoadingOverlayProvider } from "@/providers/overlay-state-provider";
import StoreProvider from "@/providers/store-provider";
import { DraggableResizableProvider } from "@/providers/dnd-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nextjs charts",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" enableSystem>
          <DraggableResizableProvider>
            <LoadingOverlayProvider>
              <StoreProvider>
                <Theme accentColor="violet" grayColor="mauve">
                  <LoadingOverlay />
                  <Navbar />
                  {children}
                </Theme>
              </StoreProvider>
            </LoadingOverlayProvider>
          </DraggableResizableProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
