import type { InterpretationEngine } from "@/ports/engines";
import type { ReportSection } from "@/domain/types";

export const placeholderInterpretationEngine: InterpretationEngine = {
  async generateFirstLoveReport(input) {
    const nickname = input.birthProfile.nickname;
    const sections: ReportSection[] = [
      {
        key: "one_line_summary",
        title: "한 줄 요약",
        body: `${nickname}님은 마음이 움직이면 깊게 몰입하지만, 관계의 속도와 안정감도 함께 중요하게 보는 타입이에요.`
      },
      {
        key: "love_style",
        title: "나의 연애 성향",
        body: "감정 표현은 진심을 확인한 뒤 깊어지는 편이에요. 가까워질수록 안정적인 대화와 서로의 생활 리듬을 존중하는 관계가 편하게 느껴질 수 있어요."
      },
      {
        key: "attraction_pattern",
        title: "내가 끌리는 사람",
        body: "대화가 자연스럽고 감정의 속도를 존중해주는 사람에게 끌릴 수 있어요. 다만 첫 인상의 강한 끌림만으로 관계를 서두르지 않는 것이 도움이 됩니다."
      },
      {
        key: "repeating_relationship_pattern",
        title: "반복되는 관계 패턴",
        body: "상대의 반응을 오래 살피다가 중요한 감정을 늦게 꺼내는 흐름이 반복될 수 있어요. 감정이 쌓이기 전에 작은 불편함부터 말해보는 연습이 좋습니다."
      },
      {
        key: "relationship_advice",
        title: "나에게 맞는 관계 방식",
        body: "관계의 속도를 함께 정하고, 중요한 대화는 결론보다 확인에 초점을 맞추면 더 편해질 수 있어요."
      },
      {
        key: "compatibility_cta",
        title: "그 사람과의 궁합",
        body: "내 연애 패턴을 확인했다면, 이제 그 사람과의 관계 흐름도 확인해볼까요?"
      }
    ];

    return {
      id: `rpt_${crypto.randomUUID()}`,
      user_id: input.birthProfile.user_id,
      birth_profile_id: input.birthProfile.id,
      saju_chart_id: "chart_placeholder",
      report_type: "first_love_pattern",
      nickname,
      status: "completed",
      sections,
      prompt_version: input.promptVersion,
      report_version: input.reportVersion,
      safety_status: "passed",
      created_at: new Date().toISOString()
    };
  }
};
