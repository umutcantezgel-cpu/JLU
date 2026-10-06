## 2026-03-31 - Fast O(1) Map Index for Curriculum Exercise Lookup
**Learning:** In `data/curriculumData.ts`, `getExerciseById` was performing nested linear array searches (`allExercises.find` + loop over `examSimulations` array and `exercises.find`). Replacing this with a pre-indexed `Map` reduces exercise lookup time from $O(N)$ to $O(1)$.
**Action:** Pre-build a `Map<string, Exercise>` for static curriculum datasets at module level so UI components rendering multiple exercise cards/links can resolve exercise metadata instantly without linear array scans.
