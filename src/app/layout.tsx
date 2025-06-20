import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";

const PoppinsSans = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Include the font weights you need
  subsets: ["latin"], // Specify subsets
  variable: "--font-poppins-sans", // Optional, for CSS variables
});

export const metadata: Metadata = {
  title: "PHDCCI",
  description: "PHDCCI Jobs Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://www.phdcciinternationalweek.in/themes/custom/phdcci/common/images/logo-final-2024.png" />
      </head>
      <body className={`font-spaceSans antialiased ${PoppinsSans.variable}`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="#7F8CAA"
              showSpinner={false}
              shadow={false}
              crawlSpeed={50}
            />
            <QueryProvider>{children}</QueryProvider>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
