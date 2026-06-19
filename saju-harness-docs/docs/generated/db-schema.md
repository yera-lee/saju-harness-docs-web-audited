# DB Schema

This file is generated and updated by Architecture Agent.

## Initial Entities

### users

- id
- email
- auth_provider
- created_at
- updated_at

### birth_profiles

- id
- user_id
- guest_session_id
- nickname
- birth_date
- birth_time
- birth_time_unknown
- calendar_type
- timezone
- gender
- interests
- created_at
- updated_at

### saju_charts

- id
- birth_profile_id
- chart_json
- calculation_version
- calculation_warnings
- created_at

### reports

- id
- user_id
- birth_profile_id
- saju_chart_id
- report_type
- status
- report_json
- report_text
- prompt_version
- report_version
- safety_status
- retry_count
- created_at

### compatibility_reports

- id
- user_id
- primary_birth_profile_id
- partner_birth_profile_id
- report_json
- report_text
- prompt_version
- report_version
- safety_status
- created_at

### payments

- id
- user_id
- product_type
- provider
- provider_payment_id
- status
- amount
- currency
- created_at
- updated_at

### audit_logs

- id
- user_id
- event_type
- metadata_json
- created_at
