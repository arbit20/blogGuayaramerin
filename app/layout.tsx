import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guayaramerín en mi voz | Evelin Gutierrez Duran",
  description:
    "Blog storytime sobre Guayaramerín, Beni, Bolivia, creado para Comunicación Social por Evelin Gutierrez Duran.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
