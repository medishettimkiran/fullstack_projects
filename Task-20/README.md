# Git Branching Strategies Project

## Objective
Demonstrate Git branching strategies using:
- Feature branches
- Merging
- Rebasing
- Merge conflict creation and resolution

## Project Structure
```
git_branching_project/
├── README.md
├── Main.java
├── feature_login.txt
├── merge_conflict_demo.txt
└── git_commands.txt
```

## Steps Performed

### 1. Initialize Repository
```bash
git init
```

### 2. Create Main Project File
Add `Main.java` and commit:
```bash
git add .
git commit -m "Initial commit"
```

### 3. Create Feature Branch
```bash
git checkout -b feature-login
```

### 4. Add Feature Changes
Modify files and commit:
```bash
git add .
git commit -m "Added login feature"
```

### 5. Merge Feature Branch
Switch to main branch:
```bash
git checkout main
git merge feature-login
```

### 6. Rebase Example
```bash
git checkout feature-login
git rebase main
```

### 7. Create Merge Conflict
Edit the same line in two branches.

Merge branches:
```bash
git merge feature-login
```

Git shows conflict markers:
```text
<<<<<<< HEAD
Main branch code
=======
Feature branch code
>>>>>>> feature-login
```

Resolve manually, then:
```bash
git add .
git commit -m "Resolved merge conflict"
```

## Conclusion
This project demonstrates practical Git workflows including branching,
merging, rebasing, and conflict resolution.