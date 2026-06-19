"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { validateBirthProfileInput } from "@/domain/validation";
import type { BirthProfileInput, Gender } from "@/domain/types";

const defaultInput: BirthProfileInput = {
  nickname: "",
  birth_date: "",
  calendar_type: "solar",
  birth_time: "",
  birth_time_unknown: false,
  gender: null,
  interests: ["love_pattern", "relationship_pattern"]
};

export default function OnboardingPage() {
  const router = useRouter();
  const [input, setInput] = useState(defaultInput);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof BirthProfileInput>(key: K, value: BirthProfileInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const result = validateBirthProfileInput(input);
    if (!result.ok) {
      setError(result.issues[0]?.message ?? "입력값을 확인해주세요.");
      return;
    }
    setSubmitting(true);
    router.push("/analyzing");
  }

  return (
    <PageShell>
      <section className="space-y-3">
        <p className="text-sm font-semibold text-sage">온보딩</p>
        <h1 className="text-3xl font-bold">내 연애 패턴을 분석할 정보를 알려주세요</h1>
        <p className="text-ink/70">출생시간을 몰라도 진행할 수 있어요.</p>
      </section>

      <form className="grid gap-5" onSubmit={submit}>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">닉네임</span>
          <input
            className="min-h-12 rounded-md border border-ink/20 bg-white px-3"
            value={input.nickname}
            onChange={(event) => update("nickname", event.target.value)}
            placeholder="지민"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold">생년월일</span>
          <input
            className="min-h-12 rounded-md border border-ink/20 bg-white px-3"
            value={input.birth_date}
            onChange={(event) => update("birth_date", event.target.value)}
            placeholder="1995-04-12"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold">양력/음력</span>
          <select
            className="min-h-12 rounded-md border border-ink/20 bg-white px-3"
            value={input.calendar_type}
            onChange={(event) => update("calendar_type", event.target.value as "solar" | "lunar")}
          >
            <option value="solar">양력</option>
            <option value="lunar">음력</option>
          </select>
        </label>

        <label className="flex items-center gap-3">
          <input
            checked={input.birth_time_unknown}
            type="checkbox"
            onChange={(event) =>
              setInput((current) => ({
                ...current,
                birth_time_unknown: event.target.checked,
                birth_time: event.target.checked ? null : ""
              }))
            }
          />
          <span className="text-sm font-semibold">출생시간을 몰라요</span>
        </label>

        {!input.birth_time_unknown ? (
          <label className="grid gap-2">
            <span className="text-sm font-semibold">출생시간</span>
            <input
              className="min-h-12 rounded-md border border-ink/20 bg-white px-3"
              value={input.birth_time ?? ""}
              onChange={(event) => update("birth_time", event.target.value)}
              placeholder="14:30"
            />
          </label>
        ) : null}

        <label className="grid gap-2">
          <span className="text-sm font-semibold">성별</span>
          <select
            className="min-h-12 rounded-md border border-ink/20 bg-white px-3"
            value={input.gender ?? ""}
            onChange={(event) => update("gender", (event.target.value || null) as Gender)}
          >
            <option value="">선택하지 않음</option>
            <option value="female">여성</option>
            <option value="male">남성</option>
            <option value="other">기타</option>
            <option value="prefer_not_to_say">말하고 싶지 않음</option>
          </select>
        </label>

        {error ? <p className="rounded-md bg-rose/10 p-3 text-sm text-rose">{error}</p> : null}

        <button
          className="min-h-12 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          disabled={submitting}
          type="submit"
        >
          {submitting ? "분석을 준비하고 있어요" : "분석 시작하기"}
        </button>
      </form>
    </PageShell>
  );
}
