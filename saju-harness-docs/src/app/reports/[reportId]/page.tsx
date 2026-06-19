import { notFound } from "next/navigation";
import { PageShell, PrimaryLink } from "@/components/PageShell";
import { runtime } from "@/application/runtime";

type ReportPageProps = {
  params: Promise<{ reportId: string }>;
};

export default async function ReportPage({ params }: ReportPageProps) {
  const { reportId } = await params;
  const report = await runtime.repositories.reports.findById(reportId);

  if (!report) {
    notFound();
  }

  return (
    <PageShell>
      <section className="space-y-3">
        <p className="text-sm font-semibold text-sage">첫 연애 성향 리포트</p>
        <h1 className="text-3xl font-bold">{report.nickname}님의 관계 패턴</h1>
        <p className="text-sm text-ink/65">이 리포트는 자기이해를 위한 참고용 분석입니다.</p>
      </section>

      <section className="grid gap-4">
        {report.sections.map((section) => (
          <article className="rounded-md border border-ink/10 bg-white p-5 shadow-sm" key={section.key}>
            <h2 className="mb-3 text-xl font-bold">{section.title}</h2>
            <p className="leading-7 text-ink/75">{section.body}</p>
          </article>
        ))}
      </section>

      <PrimaryLink href="/compatibility/start">그 사람과의 궁합 보기</PrimaryLink>
    </PageShell>
  );
}
