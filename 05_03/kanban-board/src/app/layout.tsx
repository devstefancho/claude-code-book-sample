import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "칸반 보드 | Kanban Board",
  description: "드래그 앤 드롭 기능을 지원하는 칸반 보드 웹 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
