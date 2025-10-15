# Exam Center Quiz

A web-based quiz application with an automated question import pipeline.

## Features

- **Interactive Quiz**: Take quizzes with multiple-choice questions
- **Admin Panel**: Add, edit, and manage questions through a web interface
- **Import Pipeline**: Automatically import questions from text files with deduplication
- **Multiple Formats**: Support for JSON, CSV, Excel, Word, PDF, and plain text formats

## Quick Start

1. Open `index.html` in a web browser to take the quiz
2. Open `admin.html` to manage questions
3. Use the import pipeline to bulk-import questions (see below)

## Question Import Pipeline

### Automated Import (Recommended)

1. Paste questions into `pasted.txt` (supports two formats)
2. Commit and push:
   ```bash
   git add pasted.txt
   git commit -m "Add new questions"
   git push
   ```
3. GitHub Actions automatically merges questions into `questions.js` with deduplication

### Manual Import

```bash
# Run the import script locally
npm run import-pasted
# or
./scripts/import-pasted.sh
```

### Supported Question Formats

**Classic Format:**
```
Question: What is the capital of France?
1) London
2) Berlin
3) Paris
4) Madrid
Answer: 3
Explanation: Paris is the capital city of France.
```

**Compact Format:**
```
Q: What does CPU stand for? | A: Central Processing Unit, B: Computer Personal Unit, C: Central Program Utility, D: Computer Processing Unit | Correct: A | Exp: CPU stands for Central Processing Unit.
```

### Deduplication

The pipeline automatically detects and skips duplicate questions using:
- **Question text matching**: Case-insensitive, whitespace-normalized
- **Signature matching**: Same question + options + answer

See [IMPORT_PIPELINE.md](IMPORT_PIPELINE.md) for detailed documentation.

## Project Structure

```
exam-center-quiz/
├── index.html              # Quiz interface
├── admin.html              # Admin panel
├── questions.js            # Question database
├── pasted.txt              # Import queue (paste questions here)
├── tools/                  # Import tools
│   └── merge-pasted-into-questions.js
├── scripts/                # Helper scripts
│   └── import-pasted.sh
└── .github/workflows/      # CI automation
    └── import-questions.yml
```

## Development

```bash
# Install dependencies (if any)
npm install

# Import questions
npm run import-pasted
```

## License

Open source project.