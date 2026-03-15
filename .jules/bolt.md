## 2026-03-15 - [Replace match cmp() with if/else]
**Learning:** Explict if/else branching performs better than match cmp() in hot loops
**Action:** Replaced match cmp() with if/else in hot loops in src/union.rs and src/difference.rs