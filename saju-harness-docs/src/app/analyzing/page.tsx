import { Suspense } from "react";
import { AnalyzingClient } from "./AnalyzingClient";
import { PageShell } from "@/components/PageShell";

export default function AnalyzingPage() {
  return (
    <PageShell>
      <Suspense fallback={<AnalyzingFallback />}>
        <AnalyzingClient />
      </Suspense>
    </PageShell>
  );
}

function AnalyzingFallback() {
  return (
    <section className="flex min-h-[60vh] flex-col justify-center gap-6">
      <p className="text-sm font-semibold text-sage">분석 중</p>
      <h1 className="text-3xl font-bold">사주 흐름을 정리하고 있어요.</h1>
      <p className="text-ink/70">리포트 준비 상태를 확인하고 있어요.</p>
    </section>
  );
}
