"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AnalyzingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const birthProfileId = searchParams.get("birth_profile_id");
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  const generateReport = useCallback(async () => {
    if (!birthProfileId) {
      setError("입력 정보를 찾을 수 없어요.");
      return;
    }

    try {
      setError(null);
      setRetrying(true);
      const response = await fetch("/api/reports/first-love", {
        body: JSON.stringify({ birth_profile_id: birthProfileId }),
        headers: { "content-type": "application/json" },
        method: "POST"
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        setError(payload.error?.message ?? "리포트를 생성하지 못했어요.");
        setRetrying(false);
        return;
      }

      router.replace(`/reports/${payload.data.report_id}`);
    } catch {
      setError("잠시 후 다시 시도해주세요.");
      setRetrying(false);
    }
  }, [birthProfileId, router]);

  useEffect(() => {
    void generateReport();
  }, [generateReport]);

  return (
    <section className="flex min-h-[60vh] flex-col justify-center gap-6">
      <p className="text-sm font-semibold text-sage">분석 중</p>
      <h1 className="text-3xl font-bold">사주 흐름을 정리하고 있어요.</h1>
      <div className="space-y-2 text-ink/70">
        <p>연애 성향을 분석하고 있어요.</p>
        <p>반복되는 관계 패턴을 찾고 있어요.</p>
        <p>조금만 더 기다려주세요. 리포트를 정리하고 있어요.</p>
      </div>

      {error ? (
        <div className="grid gap-3 rounded-md border border-rose/20 bg-rose/10 p-4">
          <p className="text-sm font-semibold text-rose">{error}</p>
          <button
            className="min-h-11 w-fit rounded-md bg-ink px-4 text-sm font-semibold text-white disabled:opacity-60"
            disabled={retrying}
            onClick={() => void generateReport()}
            type="button"
          >
            {retrying ? "다시 시도하고 있어요" : "다시 시도하기"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
