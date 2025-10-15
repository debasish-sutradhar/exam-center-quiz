# Question Import Pipeline

This document describes the automated pipeline for importing questions from `pasted.txt` into `questions.js`.

## Overview

The pipeline allows you to paste large question banks into `pasted.txt` and have them automatically merged into the quiz with zero duplicates. The system uses two deduplication strategies:

1. **By question text**: Prevents duplicate questions with the same text
2. **By signature**: Prevents duplicates with the same options and answer combination

## Supported Formats

### Classic Format

```
Question: What is the capital of France?
1) London
2) Berlin
3) Paris
4) Madrid
Answer: 3
Explanation: Paris is the capital and largest city of France.
```

**Notes:**
- Separate questions with blank lines
- Answer can be 1-4 (1-based) or 0-3 (0-based)
- All fields are required

### Compact Format

```
Q: What does CPU stand for? | A: Central Processing Unit, B: Computer Personal Unit, C: Central Program Utility, D: Computer Processing Unit | Correct: A | Exp: CPU stands for Central Processing Unit.
```

**Notes:**
- All on one line with pipe separators
- Options labeled A, B, C, D
- Correct answer is a letter (A-D)
- All questions separated by blank lines

## Usage

### Local Import (Manual)

1. Paste questions into `pasted.txt` (either format works)
2. Run the import script:
   ```bash
   npm run import-pasted
   # or
   ./scripts/import-pasted.sh
   ```
3. Review the output and changes in `questions.js`
4. Commit and push your changes

### Automated Import (CI)

The pipeline automatically runs when you push changes to `pasted.txt`:

1. Paste questions into `pasted.txt`
2. Commit and push:
   ```bash
   git add pasted.txt
   git commit -m "Add new questions"
   git push
   ```
3. GitHub Actions will automatically:
   - Parse and deduplicate questions
   - Merge them into `questions.js`
   - Clear `pasted.txt`
   - Commit the changes

## Deduplication Logic

### By Question Text
Questions with identical text (case-insensitive, whitespace-normalized) are considered duplicates.

### By Signature
Questions with identical:
- Question text
- All four options (order-independent)
- Correct answer

are considered duplicates.

## How It Works

1. **Parse**: Reads `pasted.txt` and identifies questions in either format
2. **Read**: Loads existing questions from `questions.js`
3. **Deduplicate**: Filters out duplicates using both strategies
4. **Merge**: Appends unique questions to the existing list
5. **Write**: Updates `questions.js` with merged questions
6. **Clear**: Empties `pasted.txt` (ready for next batch)

## File Structure

```
exam-center-quiz/
├── pasted.txt                          # Input: paste questions here
├── questions.js                        # Output: merged questions
├── tools/
│   └── merge-pasted-into-questions.js # Core merge logic
├── scripts/
│   └── import-pasted.sh               # Local import wrapper
└── .github/
    └── workflows/
        └── import-questions.yml        # CI automation
```

## Troubleshooting

### Questions not parsing correctly

- Check format matches examples above
- Ensure blank lines separate questions
- Verify all required fields are present
- Check the console output for parsing warnings

### Duplicates not detected

- The deduplication is case-insensitive and whitespace-normalized
- Minor differences in wording will create separate questions
- Review the duplicate detection logic in `tools/merge-pasted-into-questions.js`

### CI workflow not triggering

- Ensure you pushed changes to `pasted.txt`
- Check the workflow runs in the Actions tab
- Verify the workflow file is in `.github/workflows/`

## Examples

### Example 1: Bulk Import

```bash
# 1. Paste 50 questions into pasted.txt
# 2. Run locally first to test
npm run import-pasted

# 3. If looks good, commit
git add questions.js pasted.txt
git commit -m "Add 50 new security questions"
git push
```

### Example 2: Mix Both Formats

You can mix both formats in the same `pasted.txt` file:

```
Question: Classic format question?
1) Option A
2) Option B
3) Option C
4) Option D
Answer: 1
Explanation: This uses classic format.

Q: Compact format question? | A: Opt A, B: Opt B, C: Opt C, D: Opt D | Correct: B | Exp: This uses compact format.
```

## Development

To modify the pipeline:

1. Edit `tools/merge-pasted-into-questions.js`
2. Test with sample data in `pasted.txt`
3. Run `npm run import-pasted` to verify changes
4. Update this documentation if needed

## License

Same as the main project.
