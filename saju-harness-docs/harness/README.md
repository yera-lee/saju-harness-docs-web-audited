# Spec Harness

This repository-level harness checks that the documentation remains a usable contract for agent-driven implementation.

The first version is intentionally dependency-free and focuses on document quality gates:

- required documents and cross-document references
- active MVP scope boundaries
- safety language policy
- acceptance criteria and QA checklist coverage
- acceptance criteria to implementation evidence mapping
- application-level route, state, input, and report-section contracts
- domain contract artifacts such as the chart JSON schema

Run:

```sh
make harness-check
```

Run automated application evidence when application code exists:

```sh
make application-harness-check
```

Result levels:

- `PASS`: The check found no issue.
- `WARN`: The repository can continue, but the missing evidence should be addressed before implementation or release.
- `FAIL`: The repository violates a hard contract.

## Evidence Bridge

`harness/evidence/acceptance_map.json` maps each documented acceptance criterion to future evidence.

Evidence statuses:

- `planned`: The criterion is mapped, but the application test or manual evidence has not been created yet.
- `manual`: The criterion is verified by a manual QA step.
- `automated`: The criterion is verified by an executable command.

When application code is added, convert planned evidence to automated evidence by adding a command, for example:

```json
{
  "status": "automated",
  "type": "application-test",
  "target": "birth_date validation",
  "command": "npm test -- birth-date-validation"
}
```

`make application-harness-check` runs only evidence entries marked `automated`. Planned and manual evidence are reported but do not fail the harness.
