#!/bin/bash

# Import questions from pasted.txt into questions.js
# This script can be run locally before committing changes

set -e

cd "$(dirname "$0")/.."

echo "===================================="
echo "Question Import Pipeline"
echo "===================================="
echo ""

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js to run this script"
    exit 1
fi

# Check if pasted.txt exists
if [ ! -f "pasted.txt" ]; then
    echo "No pasted.txt file found."
    echo "Create pasted.txt with questions to import."
    exit 0
fi

# Check if pasted.txt is empty
if [ ! -s "pasted.txt" ]; then
    echo "pasted.txt is empty. Nothing to import."
    exit 0
fi

# Run the merge script
echo "Running merge script..."
echo ""
node tools/merge-pasted-into-questions.js

echo ""
echo "===================================="
echo "Import complete!"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. Review changes in questions.js"
echo "2. Test the quiz to ensure questions work correctly"
echo "3. Commit and push your changes"
