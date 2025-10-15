# Question Import Workflow

This document provides a visual overview of how the question import pipeline works.

## Overview

```
┌─────────────┐
│  pasted.txt │  ← Paste your questions here
└──────┬──────┘
       │
       ▼
┌──────────────────────────────────┐
│  Auto-detect format:             │
│  • Classic (multi-line)          │
│  • Compact (single-line)         │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Parse questions                 │
│  • Extract question text         │
│  • Extract 4 options             │
│  • Extract correct answer        │
│  • Extract explanation           │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Load existing questions.js      │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Deduplicate                     │
│  Strategy 1: Question text match │
│  Strategy 2: Full signature match│
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Merge new questions             │
│  (append unique questions)       │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Write updated questions.js      │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Clear pasted.txt                │
│  (ready for next batch)          │
└──────────────────────────────────┘
```

## Usage Scenarios

### Scenario 1: Local Development

```
Developer
   │
   ├─► Paste questions into pasted.txt
   │
   ├─► Run: npm run import-pasted
   │
   ├─► Review changes in questions.js
   │
   ├─► Test in browser (admin.html)
   │
   └─► Commit & push
```

### Scenario 2: CI/CD Automation

```
Developer
   │
   ├─► Paste questions into pasted.txt
   │
   ├─► Commit & push
   │
   └─► GitHub
        │
        ├─► Detect pasted.txt change
        │
        ├─► Trigger workflow
        │
        ├─► Run merge script
        │
        ├─► Auto-commit results
        │
        └─► Notify completion
```

## Format Examples

### Classic Format

```
Input (pasted.txt):
┌────────────────────────────────────────────┐
│ Question: What is the capital of France?   │
│ 1) London                                  │
│ 2) Berlin                                  │
│ 3) Paris                                   │
│ 4) Madrid                                  │
│ Answer: 3                                  │
│ Explanation: Paris is the capital city.    │
└────────────────────────────────────────────┘

Output (questions.js):
┌────────────────────────────────────────────┐
│ {                                          │
│   "question": "What is the capital...",    │
│   "options": ["London", "Berlin", ...],    │
│   "correctAnswer": 2,                      │
│   "explanation": "Paris is the capital..." │
│ }                                          │
└────────────────────────────────────────────┘
```

### Compact Format

```
Input (pasted.txt):
┌────────────────────────────────────────────────────────────────────┐
│ Q: What is 2+2? | A: 3, B: 4, C: 5, D: 6 | Correct: B | Exp: ...  │
└────────────────────────────────────────────────────────────────────┘

Output (questions.js):
┌────────────────────────────────────────────┐
│ {                                          │
│   "question": "What is 2+2?",             │
│   "options": ["3", "4", "5", "6"],       │
│   "correctAnswer": 1,                      │
│   "explanation": "..."                     │
│ }                                          │
└────────────────────────────────────────────┘
```

## Deduplication Logic

### By Question Text

```
Existing: "What is the capital of France?"
New:      "what is the capital of france?"  ← DUPLICATE (case-insensitive)
New:      "What's the capital of France?"   ← NOT DUPLICATE (different text)
```

### By Signature

```
Existing:
  Question: "What is 2+2?"
  Options: ["3", "4", "5", "6"]
  Answer: 1 (4)

New: Same question, same options, same answer → DUPLICATE
New: Same question, different options → NOT DUPLICATE
New: Same question, same options, different answer → NOT DUPLICATE
```

## File Structure

```
exam-center-quiz/
│
├── pasted.txt              ← Input: Paste questions here
├── questions.js            ← Output: Merged questions
│
├── tools/
│   └── merge-pasted-into-questions.js  ← Core logic
│
├── scripts/
│   └── import-pasted.sh    ← Local runner
│
├── .github/
│   └── workflows/
│       └── import-questions.yml  ← CI automation
│
└── docs/
    ├── IMPORT_PIPELINE.md  ← Full documentation
    ├── TESTING.md          ← Test scenarios
    └── WORKFLOW.md         ← This file
```

## Error Handling

```
Malformed Question
      │
      ├─► Missing required field? → Skip, warn in console
      ├─► Wrong number of options? → Skip, warn in console
      ├─► Invalid answer index? → Skip, warn in console
      └─► Parse error? → Skip, warn in console

Valid Question
      │
      └─► Continue processing
```

## Benefits

✓ **Time Savings**: Import hundreds of questions in seconds
✓ **No Duplicates**: Automatic deduplication prevents redundancy
✓ **Format Flexibility**: Support for multiple input formats
✓ **Error Tolerant**: Malformed questions are skipped, not fatal
✓ **CI Integration**: Push and forget, automation handles the rest
✓ **Audit Trail**: Git history tracks all imports
✓ **Reversible**: All changes are in version control

## Limitations

- Questions must have exactly 4 options
- Single correct answer (no multi-select support in parser)
- English text only (no locale support)
- Manual review recommended for large imports
- Deduplication is text-based (semantic duplicates not detected)

## Future Enhancements

Potential improvements:
- Support for multi-select questions
- Import from external URLs
- Validation against schema
- Preview mode before committing
- Batch operations (edit, delete)
- Import statistics dashboard
- Question difficulty tagging
