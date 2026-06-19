import { PageShell, SecondaryLink } from "@/components/PageShell";

export default function ErrorPage() {
  return (
    <PageShell>
      <section className="flex min-h-[60vh] flex-col justify-center gap-5">
        <p className="text-sm font-semibold text-rose">문제가 발생했어요</p>
        <h1 className="text-3xl font-bold">리포트를 생성하는 중 문제가 발생했어요.</h1>
        <p className="max-w-xl leading-7 text-ink/70">입력값을 확인하거나 잠시 후 다시 시도해주세요.</p>
        <SecondaryLink href="/onboarding">다시 시도하기</SecondaryLink>
      </section>
    </PageShell>
  );
}
