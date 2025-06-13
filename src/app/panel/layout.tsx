import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content | Pet-O-Pia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}