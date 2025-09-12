import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

import "../../styles/main.scss";
import AuthProvider from "@/provider/AuthProvider";
import AuthCheckProvider from "@/provider/AuthCheckProvider";
import Menu from "@/components/Menu/Menu";

export const metadata: Metadata = {
  title: "Mindore",
  description: "Mindore by ELFASA",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }


  return (
    <html lang={locale}>
      <head>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@100..900&family=Nunito:wght@200..1000&family=Rubik:wght@300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider>
          <AuthProvider>
            <AuthCheckProvider>
              <Menu/>
              {children}
              </AuthCheckProvider>
          </AuthProvider>
   
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
