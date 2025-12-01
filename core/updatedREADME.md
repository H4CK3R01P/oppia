# Research: Oppia PRs relevant to "Make Stats Report for Creators"

This short README summarizes a quick search I ran in the oppia/oppia repository for merged PRs that matched keywords around "report", "creator stats", and related analytics terms. From the recent merged results I filtered out 3 representative PRs and added a brief note on why each could matter when designing a "Stats Report for Creators" feature in a learning portal.

Search note
- Repository searched: `oppia/oppia`
- Search query (used to collect results): is:pr is:merged repo:oppia/oppia ("creator stats" OR "stats report" OR "learning portal analytics" OR "report")
- The search returned 3,375 total results; the API returned the top 10 most recent merged PRs. View more results here:
  https://github.com/search/issues?q=is:pr+is:merged+repo:oppia/oppia+"creator+stats"+OR+"stats+report"+OR+"learning+portal+analytics"+OR+"report"&sort=updated&order=desc

Selected 3 merged PRs (filtered)
1. Relax the regex for app feedback domain reports
   - PR: #23869
   - Link: https://github.com/oppia/oppia/pull/23869
   - Merged at: 2025-11-19T11:04:14Z
   - Author: seanlip
   - Summary / relevance: Adjusts the regex used for parsing app feedback domain reports (e.g., language code handling). Parsing and normalization of incoming feedback/report data is a prerequisite for reliable analytics — ensuring the report ingestion correctly recognizes fields (language, domain) reduces data loss and misattribution.

2. Fix regex issues.
   - PR: #23804
   - Link: https://github.com/oppia/oppia/pull/23804
   - Merged at: 2025-11-11T16:14:14Z
   - Author: seanlip
   - Summary / relevance: Several regex fixes (including improvements to comment removal and app_feedback_report handling). Data cleaning and robust parsing are important when building creator-facing reports so input is sanitized and aggregated correctly.

3. Fix #17117: Fix CodeQL sanitization issues.
   - PR: #23807
   - Link: https://github.com/oppia/oppia/pull/23807
   - Merged at: 2025-11-12T14:11:18Z
   - Author: seanlip
   - Summary / relevance: Addresses sanitization and input-validation issues flagged by static analysis. For a reporting feature, input validation and sanitization are critical to ensure analytics computations and displayed reports are safe and accurate.

Why these matter to "Make Stats Report for Creators"
- Ingestion correctness: Reports and feedback must be parsed and normalized reliably (languages, domains, user-supplied fields). The two regex PRs above touch precisely this layer.
- Data safety and correctness: Sanitization fixes reduce the risk of corrupted or malicious data entering analytics pipelines.
- Upstream hygiene: Many merged PRs are infra/lint/regex fixes — before implementing new analytics, it helps to ensure the codebase correctly handles and validates the raw data you'll rely on.

Suggested next steps for a "Stats Report for Creators" feature
1. Define the metrics (examples):
   - Creators: total creations, published explorations, drafts, revision counts.
   - Learners: unique learners reached per creator, completion rates, average score, time-on-task.
   - Engagement: question success rates per exploration, drop-off points (by state/step).
2. Instrumentation & events:
   - Identify events to capture (view_start, lesson_complete, state_submit, hint_requested, etc.)
   - Ensure events include creator_id and exploration_id (and are sanitized).
3. Storage & pipeline:
   - Decide storage (BigQuery, analytics DB). Create a nightly/streaming pipeline (Beam / Dataflow) that aggregates raw events to creator-level metrics.
4. Backend APIs:
   - Add endpoints to fetch paginated/filtered metric summaries (e.g., /creators/{id}/reports?from=&to=&metric=).
   - Apply access control so creators only see their data (or admin views).
5. Frontend dashboard:
   - Wireframe visualizations: summary cards, trend charts, top explorations, funnel/drop-off charts.
   - Provide export (CSV) and date-range filters.
6. Tests & monitoring:
   - Unit + integration tests for ingestion and aggregation.
   - Alerts for drops in event counts (could indicate regressions in instrumentation).

If you want, I can:
- Convert the above suggested next steps into a concise design doc you can attach alongside this README.
- Generate a starter API schema and a sample SQL/Beam aggregation query for one metric (e.g., unique learners per creator).
- Expand this README with a small visual mockup or quick wireframe links.

---
If you'd like any wording changes or additional sections in the README (for example, a short "About me" paragraph so it reads well on your GitHub profile), tell me what personal detail(s) to include and I will update the file.