# Git Basic Operations Project in Java

## Objective
Demonstrate basic Git operations:
- Initialize a repository
- Stage files
- Commit changes
- View version history
- Add remote repository
- Push project to GitHub

## Project Structure
```
git_basic_java_project/
├── README.md
├── Main.java
├── .gitignore
└── git_commands.txt
```

## Git Commands

### Initialize Repository
```bash
git init
```

### Stage Files
```bash
git add .
```

### Commit Files
```bash
git commit -m "Initial commit"
```

### Check History
```bash
git log
```

### Add Remote Repository
```bash
git remote add origin https://github.com/your-username/git-basic-java-project.git
```

### Push to GitHub
```bash
git branch -M main
git push -u origin main
```