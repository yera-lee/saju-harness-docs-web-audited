import { PageShell, PrimaryLink } from "@/components/PageShell";

export default function AnalyzingPage() {
  return (
    <PageShell>
      <section className="flex min-h-[60vh] flex-col justify-center gap-6">
        <p className="text-sm font-semibold text-sage">분석 중</p>
        <h1 className="text-3xl font-bold">사주 흐름을 정리하고 있어요.</h1>
        <div className="space-y-2 text-ink/70">
          <p>연애 성향을 분석하고 있어요.</p>
          <p>반복되는 관계 패턴을 찾고 있어요.</p>
          <p>조금만 더 기다려주세요. 리포트를 정리하고 있어요.</p>
        </div>
        <PrimaryLink href="/reports/demo">데모 리포트 보기</PrimaryLink>
      </section>
    </PageShell>
  );
}
