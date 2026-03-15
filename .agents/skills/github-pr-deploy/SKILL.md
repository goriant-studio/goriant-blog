---
description: Create a GitHub pull request, merge it, and trigger CI/CD deploy. Use when the user asks to open a PR, merge, or ship to production via GitHub Actions.
---

# GitHub PR → Merge → Deploy (CI/CD)

This skill covers the full end-to-end flow: push a feature branch, open a PR on GitHub, merge it, and let CI/CD deploy automatically.

## When to Use This Skill
- User says "create PR", "mở PR", "tạo PR", "merge", or "deploy via CI"
- User wants changes to go through GitHub before hitting production
- User wants to confirm CI passes before merging

---

## Prerequisites

- `gh` CLI must be authenticated (`gh auth status`).
- Remote `origin` must be GitHub.
- A CI/CD workflow file must exist in `.github/workflows/`.

---

## Step-by-Step

### 1. Ensure you are on a feature branch

Never open a PR from `main`/`master` directly.

```bash
git branch --show-current
```

If on `main`, create a feature branch first:

```bash
git checkout -b feat/<short-description>
```

### 2. Stage, commit, and push

```bash
git add -A
git status
git commit -m "<type>: <short description>"
git push -u origin HEAD
```

**Commit message conventions:**
- `feat:` new feature
- `fix:` bug fix
- `chore:` maintenance / config
- `content:` blog post or copy changes
- `docs:` documentation

### 3. Create the Pull Request

```bash
gh pr create \
  --title "<PR title>" \
  --body "<Short description of what changed and why>" \
  --base main
```

Options:
- Add `--draft` if the PR is not ready for review.
- Add `--label "ci-skip"` to skip CI (rarely needed).

### 4. Wait for CI to pass

```bash
gh pr checks --watch
```

This streams CI status. Wait until all checks are green before merging.

If a check fails, investigate logs:

```bash
gh run view --log-failed
```

### 5. Merge the PR

Use **squash merge** to keep `main` history clean:

```bash
gh pr merge --squash --delete-branch
```

Options:
- `--squash` — squash all commits into one (preferred)
- `--merge` — standard merge commit
- `--rebase` — rebase merge
- `--delete-branch` — clean up the remote feature branch after merge

### 6. Verify CI/CD deployment triggered

After merge, the deploy workflow runs automatically on `main`. Check it:

```bash
gh run list --branch main --limit 5
```

Watch the latest deploy run:

```bash
gh run watch
```

---

## Rollback

If a bad deploy goes to production:

```bash
git revert HEAD --no-edit
git push
```

This creates a revert commit which triggers CI/CD to redeploy the previous state.

---

## Tips

- Always check `gh pr checks` before merging — never force-merge with a failing CI.
- Use `--draft` PRs for work-in-progress to get early CI feedback without signalling readiness.
- Delete feature branches after merge to keep the repo clean (`--delete-branch`).
- If the repo uses branch protection rules, `gh pr merge` will respect them automatically.
