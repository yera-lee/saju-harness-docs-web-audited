# Environment

## Purpose

이 문서는 MVP 구현에 필요한 환경 변수, local development assumptions, deployment notes를 정의한다.

## Local Development

Expected commands after scaffold:

```sh
npm install
npm run dev
npm test
make harness-check
make application-harness-check
```

Exact commands may change after scaffold, but changes must be reflected here and in evidence commands.

## Environment Variables

### Required for first placeholder slice

None.

The first implementation slice should run without external API keys.

### Expected later variables

```text
DATABASE_URL=
LLM_API_KEY=
SESSION_SECRET=
APP_BASE_URL=
```

Rules:
- never commit `.env` with real secrets
- provide `.env.example` when variables are introduced
- tests should not require production secrets
- prompt generation must not run in tests unless explicitly mocked at the boundary

## Data Storage

First slice may use:
- in-memory storage for prototype only
- local SQLite if persistence is implemented

If in-memory storage is used:
- document it in handoff notes
- ensure report revisit behavior is represented honestly
- track persistence follow-up before release

## Deployment Notes

Deployment is not part of Slice 1.

Nixpacks compatibility should be considered later:
- build command
- start command
- environment variables
- persistent database setup

## Security Notes

Local logs must not include:
- full birth date with nickname or email
- raw relationship concerns
- generated full reports unless needed for local debugging
- secrets

Error messages sent to the browser must be user-safe.

