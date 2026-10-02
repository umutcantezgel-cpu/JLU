## 2025-02-18 - Fast Map Indexing for Curriculum Lookups
**Learning:** Sequential `.find()` calls across exercises in render loops (e.g. `RabiaNotesView`) and initialization scripts cause repeated O(N) array scans. Pre-indexing exercises into a `Map<string, Exercise>` enables O(1) lookups.
**Action:** Always pre-index static catalog/curriculum datasets into `Map` structures when frequent ID lookups occur.
