import { PageShell, SecondaryLink } from "@/components/PageShell";

export default function CompatibilityStartPage() {
  return (
    <PageShell>
      <section className="flex min-h-[60vh] flex-col justify-center gap-5">
        <p className="text-sm font-semibold text-sage">궁합 CTA</p>
        <h1 className="text-3xl font-bold">그 사람과의 관계 흐름도 확인해볼까요?</h1>
        <p className="max-w-xl leading-7 text-ink/70">
          MVP에서는 궁합 분석의 시작 화면까지만 제공합니다. 완전한 궁합 리포트는 다음 단계에서 다룹니다.
        </p>
        <SecondaryLink href="/">처음으로 돌아가기</SecondaryLink>
      </section>
    </PageShell>
  );
}
