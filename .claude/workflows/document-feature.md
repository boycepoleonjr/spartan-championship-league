# Feature Documentation Workflow

This workflow should be run before creating a PR to ensure comprehensive documentation.

## Steps

1. **Analyze the changes**
   - Review all modified/created files
   - Identify new components, hooks, utilities, or features
   - Understand the purpose and dependencies

2. **Update or create documentation**
   - Add/update relevant sections in `docs/` directory
   - Update CHANGELOG.md with feature summary
   - Add architecture notes if new patterns introduced
   - Document any new environment variables or configuration

3. **Create usage examples**
   - Add code examples for new hooks/components
   - Update example pages if applicable
   - Document common use cases

4. **Update related documentation**
   - Update AGENT_TASKS.md to mark tasks as complete
   - Update project README if user-facing features added
   - Add to API documentation if backend changes made

## Documentation Structure

```
docs/
├── architecture/          # High-level design decisions
│   ├── database-schema.md
│   ├── authentication.md
│   └── state-management.md
├── features/              # Feature-specific documentation
│   ├── custom-hooks.md
│   ├── ui-components.md
│   └── admin-dashboard.md
├── development/           # Developer guides
│   ├── getting-started.md
│   ├── testing.md
│   └── deployment.md
└── api/                   # API documentation
    ├── rest-endpoints.md
    └── database-functions.md
```

## Template for Feature Documentation

See `docs/templates/feature-template.md` for the standard template.
