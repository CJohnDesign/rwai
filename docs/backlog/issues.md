# GitHub Issues Sync PRD

## Overview
Create a bidirectional sync between GitHub issues and local markdown files to maintain a single source of truth for project documentation and tracking.

## Problem Statement
Currently, issues exist in two disconnected places:
1. GitHub Issues (2 live issues)
2. Local markdown files in `/docs/issues`

This separation creates friction in managing issues and documentation.

## Proposed Solution
Implement a two-phase approach to synchronize GitHub issues with local markdown files.

### Phase 1: Pull (GitHub → Local)
Pull existing GitHub issues into local markdown files with structured formatting.

**Requirements:**
- Fetch all open issues from the repository
- Convert each issue into a markdown file
- Store files in `/docs/issues` directory 
- Maintain metadata including:
  - Issue number
  - Title
  - Labels
  - Status
  - Creation date
  - Last updated
  - Assignees
  - Last sync hash (for merge detection)

**File Format:**
```md
---
issue: #123
title: "Original Issue Title"
labels: ["bug", "documentation"]
status: open
created: 2024-03-20
updated: 2024-03-21
assignees: ["username1"]
sync_hash: "abc123" # Used for merge conflict detection
---

# Issue Title

Original issue description goes here...

## Comments
<!-- Comments will be synchronized -->
```

### Diff Management
When changes are detected, the system generates diff reports in `/docs/issues/_diffs/`:

**Diff File Format:**
```md
---
issue: #123
diff_type: "merge_conflict" # or "local_update" or "remote_update"
timestamp: 2024-03-21T10:30:00Z
status: "unresolved" # or "resolved"
labels: ["needs-review"]
---

# Diff Report for Issue #123

## Local Changes
```diff
- Original title
+ Updated local title
```

## Remote Changes
```diff
- Original description
+ Updated remote description
```

## Conflict Areas
- Title
- Description paragraph 2

## Resolution Steps
1. Review local changes
2. Review remote changes
3. Manual merge required for title
4. [ ] Mark as resolved
```

The system will:
1. Generate diff files automatically when conflicts occur
2. Name files as `ISSUE_NUMBER-TIMESTAMP.diff.md`
3. Add labels for easy filtering:
   - `needs-review`: Unresolved conflicts
   - `local-ahead`: Local changes ready to push
   - `remote-ahead`: Remote changes to pull
   - `resolved`: Handled diffs

### Sync Strategy
The system will use a push-based sync mechanism:

1. **Trigger**: 
   - Sync occurs on every `git push` to the main branch
   - Only processes files that have changed since last push

2. **Merge Resolution**:
   - System compares `sync_hash` in frontmatter with last known state
   - If local file was modified without updating GitHub issue:
     - Local changes take precedence
     - GitHub issue is updated to match
   - If GitHub issue was modified since last sync:
     - Latest GitHub changes are pulled
     - Local changes are merged on top
     - Conflicts are logged for manual review

3. **Change Detection**:
   ```yaml
   name: Issue Sync
   on:
     push:
       branches:
         - main
       paths:
         - 'docs/issues/**'
   ```

### Phase 2: Push (Local → GitHub)
Enable creation and updates of GitHub issues from local markdown files.

**Requirements:**
- Watch `/docs/issues` for file changes
- Parse frontmatter metadata for issue properties
- Create new issues when new files are added
- Update existing issues when files are modified
- Support for:
  - Title updates
  - Content updates
  - Label changes
  - Status changes
  - Assignee changes

## Technical Implementation

### Phase 1 Implementation
1. Create GitHub Action workflow for pull operation
2. Use GitHub REST API to fetch issues
3. Transform issues into markdown with frontmatter
4. Write files to `/docs/issues`
5. Add git commit/push step

### Phase 2 Implementation
1. Create GitHub Action workflow for push operation
2. Watch for changes in `/docs/issues`
3. Parse modified files
4. Update or create GitHub issues via API
5. Add conflict resolution strategy

## Success Metrics
- All existing GitHub issues are properly represented in local markdown
- Changes to local files successfully sync to GitHub
- Maintain data integrity between both systems
- No duplicate issues or data loss

## Timeline
- Phase 1 (Pull): 1 week
- Phase 2 (Push): 2 weeks
- Testing & Refinement: 1 week

## Future Considerations
- Comment synchronization
- Real-time sync capabilities
- Conflict resolution UI
- Support for issue templates
- Markdown rendering preview
- Support for issue relationships/dependencies



---
From Perplexity
---

# Open Source GitHub Issues-to-Markdown Sync Frameworks

Based on the search results, there isn't a comprehensive open source framework that fully implements the bidirectional GitHub issues and local markdown files sync as described in your PRD, but there are several projects that provide partial functionality or could serve as building blocks for your custom solution.

## Existing Partial Solutions

### issue-to-markdown

This GitHub Action comes closest to the "Pull" phase of your proposed solution, converting GitHub issues into markdown files within your repository[1].

**Key Features:**
- Monitors issues and converts them to markdown files
- Triggered by issue events (labeled, edited)
- Stores files in specified location in your repository
- Uses GitHub Actions for automation

However, it lacks the bidirectional sync and conflict resolution features in your PRD.

### org-sync

While not markdown-based, org-sync provides bidirectional synchronization between GitHub/GitLab issues and org-mode files[4].

**Key Features:**
- Bidirectional sync capabilities
- Allows searching issues locally
- Can add new outline elements locally and sync them back to GitHub
- Supports setting tags/labels locally

The downside is that it's Emacs-specific and uses org-mode format rather than markdown.

## Related Tools That Could Be Adapted

### octosync

An open-source solution for bidirectional sync between GitHub and Jira issues[3][5]. While it doesn't sync with local files, its architecture for handling bidirectional sync could be instructive.

**Key Features:**
- Syncs issue creation bidirectionally
- Syncs issue closing bidirectionally
- Syncs issue comments bidirectionally

### github-issue-sync

A GitHub action that synchronizes GitHub Issues to GitHub Projects[7]. While not related to file synchronization, it demonstrates approaches to issue event handling.

## Building a Custom Solution

Given that no existing framework fully matches your requirements, you'll need to build a custom solution. The approach would likely involve:

1. **GitHub Actions** for automation
2. **GitHub API** for fetching and creating/updating issues
3. **Custom logic** for markdown parsing and generation
4. **Git operations** for detecting local changes and handling conflicts

You could potentially build upon issue-to-markdown for the "Pull" phase and develop your own "Push" phase implementation.

## Conclusion

While there's no ready-made open source framework that implements the complete bidirectional sync as specified in your PRD, there are several components and related projects that could serve as building blocks or inspiration. Your custom solution would likely need to integrate GitHub Actions, GitHub API, and custom markdown processing logic to achieve the full functionality you've outlined.

The most promising starting point would be the issue-to-markdown GitHub Action[1], which you could extend with bidirectional capabilities and conflict resolution features.
