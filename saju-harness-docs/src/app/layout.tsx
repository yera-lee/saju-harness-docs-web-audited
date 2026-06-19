import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saju Relationship Report",
  description: "사주 기반 연애 성향과 반복되는 관계 패턴 리포트"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
