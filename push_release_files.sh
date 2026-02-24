#!/bin/bash

# Script to push release files one by one from the existing commit

cd /Users/weimingzhuang/Documents/source_code/wealth-2026

# Check if there are multiple commits before attempting reset
commit_count=$(git rev-list --count HEAD)
if [ "$commit_count" -gt 1 ]; then
    echo "Resetting the commit to push files individually..."
    git reset --soft HEAD~1
    echo "Getting list of files to push..."
    files=$(git diff --name-only HEAD | sort)
else
    echo "No previous commits found. Adding all untracked files..."
    # Get all untracked files except the script itself
    files=$(git ls-files --others --exclude-standard | grep -v "push_release_files.sh" | sort)
fi

total_files=$(echo "$files" | wc -l)
current_file=1

echo "Starting to process $total_files files..."

for file in $files; do
    echo "Processing file $current_file of $total_files: $file"

    # Add the file to git
    git add "$file"

    # Commit the file with a specific message
    git commit -m "Add release file: $file"

    # Push to remote
    git push origin main

    if [ $? -eq 0 ]; then
        echo "Successfully pushed: $file"
    else
        echo "Push failed, pulling remote changes first..."
        git pull --rebase origin main
        if [ $? -ne 0 ]; then
            echo "Failed to pull remote changes: $file"
            exit 1
        fi

        # Try pushing again after pull
        git push origin main
        if [ $? -eq 0 ]; then
            echo "Successfully pushed after pull: $file"
        else
            echo "Failed to push after pull: $file"
            exit 1
        fi
    fi

    current_file=$((current_file + 1))
    echo "Completed $current_file of $total_files files"
    echo "----------------------------------------"
done

echo "All files processed successfully!"