# ARCHITECTURE.md

## System Overview

이 서비스는 사용자의 생년월일, 양력/음력, 출생시간 정보를 기반으로 사주 원국을 계산하고, 계산 결과를 사용자 친화적인 연애·관계·자기이해 리포트로 변환하는 웹 서비스다.

핵심 원칙은 계산과 해석을 분리하는 것이다.

- Calculation Engine: 명식 계산, 오행, 십신, 일간, 지지/천간 구조화
- Interpretation Engine: 계산 결과를 읽기 쉬운 리포트로 변환
- Safety Layer: 단정적 예언, 불안 유발 표현, 고위험 조언 필터링

## Main Components

### Frontend

Responsibilities:
- 랜딩 화면
- 온보딩 입력 플로우
- 첫 연애 성향 리포트 화면
- 궁합 CTA
- 오류/로딩/재시도 UI
- 저장된 리포트 조회 화면

### Backend API

Responsibilities:
- 사용자 프로필 저장
- birth profile 생성/수정
- 사주 계산 요청 처리
- 리포트 생성 요청 처리
- 저장된 리포트 조회
- 결제 상태 확인
- rate limit 및 abuse control

### Saju Calculation Engine

Responsibilities:
- 양력/음력 변환
- 출생시간 처리
- 사주팔자 계산
- 오행 분포 계산
- 십신 분포 계산
- 일간 중심 구조 생성
- 계산 경고 생성

### Interpretation Engine

Responsibilities:
- 구조화된 chart_json을 리포트로 변환
- 관심 주제별 해석 생성
- 연애 성향, 반복 패턴, 궁합 CTA 생성
- prompt_version별 결과 관리

### Safety Layer

Responsibilities:
- 위험 표현 필터링
- 단정적 예언 완화
- 의료/법률/투자 판단 오해 방지
- 결과 문장 tone consistency 확인

### Database

Initial entities:
- users
- birth_profiles
- saju_charts
- reports
- compatibility_reports
- payments
- audit_logs

## Data Flow

1. 사용자가 온보딩 정보를 입력한다.
2. Backend API가 birth profile을 저장한다.
3. Calculation Engine이 chart_json을 생성한다.
4. Interpretation Engine이 chart_json과 관심 주제를 기반으로 report_json/report_text를 생성한다.
5. Safety Layer가 결과를 검수한다.
6. Frontend가 첫 리포트를 표시하고 궁합 CTA를 제공한다.

## Key Decisions

1. 계산 엔진과 해석 엔진은 분리한다.
2. 원국 계산 결과는 구조화된 JSON으로 저장한다.
3. 자연어 리포트는 prompt_version과 report_version을 관리한다.
4. 출생시간을 모르는 사용자를 위한 fallback 분석을 제공한다.
5. 궁합 기능은 첫 리포트 이후의 2차 행동으로 제공한다.

## Open Questions

- 초기 MVP에서 회원가입을 필수로 할지, 게스트 리포트 후 저장 시 가입으로 유도할지 결정 필요
- 음력 변환 라이브러리 선택 필요
- 무료/유료 리포트의 정보량 차이 정의 필요
