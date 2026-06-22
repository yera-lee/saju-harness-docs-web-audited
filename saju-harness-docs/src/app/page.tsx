import { PageShell, PrimaryLink, SecondaryLink } from "@/components/PageShell";

export default function LandingPage() {
  return (
    <PageShell>
      <section className="flex min-h-[70vh] flex-col justify-center gap-7">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-sage">사주 기반 관계 리포트</p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            나는 어떤 연애를 반복할까?
          </h1>
          <p className="max-w-xl text-lg leading-8 text-ink/75">
            생년월일을 바탕으로 나의 연애 성향, 끌리는 사람, 반복되는 관계 패턴을 분석해드려요.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <PrimaryLink href="/onboarding">내 연애 패턴 분석하기</PrimaryLink>
          <SecondaryLink href="/compatibility/start">그 사람과의 궁합 보기</SecondaryLink>
        </div>
      </section>
    </PageShell>
  );
}
