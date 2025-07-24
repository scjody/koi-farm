# AI Development Workflow

This document outlines the development workflow for AI assistants working on this project.

## Git Workflow

### Branch Management
1. **Create a new branch** when starting any new task such as:
   - New features
   - Bug fixes
   - Refactoring
   - Documentation updates

### Commit Strategy
2. **Commit frequently** when it makes logical sense:
   - After completing a logical unit of work
   - Before switching contexts or taking breaks
   - When reaching a stable state

3. **Amend commits** for small fixes:
   - Use `git commit --amend` for typos or small corrections to the most recent commit
   - Only amend commits that haven't been pushed yet

### Pull Request Process
4. **Create PRs** when code is ready for user testing:
   - All functionality is implemented and tested
   - Code follows project conventions
   - Documentation is updated if needed
   - Ready for human review and testing

## Best Practices

- Use descriptive branch names (e.g., `feature/koi-animation`, `fix/mobile-layout`)
- Write clear commit messages that explain the "why" not just the "what"
- Include testing instructions in PR descriptions
- Reference related issues or discussions in commits/PRs