# Testing the Import Pipeline

This document describes how to test the question import pipeline.

## Manual Testing

### Test 1: Classic Format Import

1. Create test data:
```bash
cat > pasted.txt << 'EOF'
Question: What is the primary purpose of a firewall?
1) To speed up internet connection
2) To filter network traffic based on security rules
3) To increase storage capacity
4) To backup data automatically
Answer: 2
Explanation: A firewall is a network security device that monitors and filters incoming and outgoing network traffic.
EOF
```

2. Run import:
```bash
npm run import-pasted
```

3. Expected output:
```
Found 1 questions in pasted.txt
Added 1 new questions
```

### Test 2: Compact Format Import

1. Create test data:
```bash
cat > pasted.txt << 'EOF'
Q: Which protocol is used to send email? | A: HTTP, B: FTP, C: SMTP, D: SSH | Correct: C | Exp: SMTP is the standard protocol for sending emails.
EOF
```

2. Run import:
```bash
npm run import-pasted
```

3. Expected output:
```
Found 1 questions in pasted.txt
Added 1 new questions
```

### Test 3: Mixed Format Import

1. Create test data with both formats:
```bash
cat > pasted.txt << 'EOF'
Question: What does SQL stand for?
1) Structured Question Language
2) Simple Query Language
3) Structured Query Language
4) Standard Query Language
Answer: 3
Explanation: SQL stands for Structured Query Language.

Q: What does HTTP stand for? | A: Hyper Text Transfer Protocol, B: High Tech Transfer Protocol, C: Hyper Transfer Text Protocol, D: Home Text Transfer Protocol | Correct: A | Exp: HTTP stands for Hyper Text Transfer Protocol.
EOF
```

2. Run import:
```bash
npm run import-pasted
```

3. Expected output:
```
Found 2 questions in pasted.txt
Added 2 new questions
```

### Test 4: Deduplication

1. Import a question:
```bash
cat > pasted.txt << 'EOF'
Question: Test question
1) A
2) B
3) C
4) D
Answer: 1
Explanation: Test explanation.
EOF
npm run import-pasted
```

2. Try importing the same question again:
```bash
cat > pasted.txt << 'EOF'
Question: Test question
1) A
2) B
3) C
4) D
Answer: 1
Explanation: Test explanation.
EOF
npm run import-pasted
```

3. Expected output:
```
Found 1 questions in pasted.txt
Added 0 new questions
Skipped 1 duplicates
```

### Test 5: Malformed Questions

1. Create test data with malformed questions:
```bash
cat > pasted.txt << 'EOF'
Question: Missing options

Question: Missing explanation
1) A
2) B
3) C
4) D
Answer: 1

Question: Valid question
1) A
2) B
3) C
4) D
Answer: 1
Explanation: This is valid.
EOF
```

2. Run import:
```bash
npm run import-pasted
```

3. Expected output:
```
Found 1 questions in pasted.txt
Added 1 new questions
```

Only the valid question should be imported.

## Automated Testing (CI)

The GitHub Actions workflow automatically runs when:
1. Changes to `pasted.txt` are pushed to main/master branch
2. Manual trigger via workflow_dispatch

### Testing the Workflow

1. Create a branch with test questions:
```bash
git checkout -b test-import
cat > pasted.txt << 'EOF'
Question: Test question for CI
1) Option A
2) Option B
3) Option C
4) Option D
Answer: 1
Explanation: Testing the CI pipeline.
EOF
git add pasted.txt
git commit -m "Test CI import"
git push origin test-import
```

2. Merge to main and check Actions tab in GitHub

3. Expected behavior:
   - Workflow runs automatically
   - Questions are merged into questions.js
   - pasted.txt is cleared
   - Changes are committed automatically

## Verification

After any import, verify:

1. Question count increased correctly:
```bash
node -e "const q = require('./questions.js'); console.log('Total:', quizQuestions.length);"
```

2. pasted.txt was cleared:
```bash
cat pasted.txt
# Should be empty or show template comments
```

3. Questions are valid JSON:
```bash
node -c questions.js
```

4. Test in the quiz:
- Open `index.html` in a browser
- Verify new questions appear
- Verify they work correctly

## Common Issues

### Issue: Questions not parsing
- Check format matches examples exactly
- Ensure blank lines separate questions
- Verify all required fields are present

### Issue: Duplicates not detected
- Deduplication is case-insensitive
- Minor text differences create separate questions
- Check the question text matches exactly

### Issue: CI workflow not running
- Verify pasted.txt has non-comment content
- Check workflow file is in .github/workflows/
- Check Actions tab for errors

## Reset for Testing

To reset questions.js to original state:
```bash
git checkout 97f6d36 -- questions.js
```

To clear pasted.txt:
```bash
> pasted.txt
```
