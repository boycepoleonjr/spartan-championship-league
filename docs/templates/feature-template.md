# [Feature Name] - [TASK-ID]

**Status:** ✅ Complete | 🚧 In Progress | 📋 Planned
**Branch:** `feature/task-xxx-feature-name`
**Related Tasks:** TASK-XXX
**Created:** YYYY-MM-DD
**Last Updated:** YYYY-MM-DD

---

## Overview

Brief description of what this feature does and why it exists.

**Key Benefits:**
- Benefit 1
- Benefit 2
- Benefit 3

---

## Architecture

### File Structure
```
src/
├── hooks/
│   ├── useFeature.ts
│   └── index.ts
└── components/
    └── FeatureComponent.tsx
```

### Dependencies
- Package 1 (version) - Why it's needed
- Package 2 (version) - Why it's needed

### Integration Points
- How this feature connects to Supabase
- How it integrates with existing components
- Any state management considerations

---

## API Reference

### Hook/Component Name

**Import:**
```typescript
import { useFeature } from '@/hooks'
```

**Signature:**
```typescript
function useFeature<T>(
  param1: string,
  param2?: number
): ReturnType
```

**Parameters:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| param1 | string | - | Description |
| param2 | number | undefined | Description |

**Returns:**
| Property | Type | Description |
|----------|------|-------------|
| data | T | The data returned |
| loading | boolean | Loading state |

---

## Usage Examples

### Basic Example
```typescript
// Example with explanation
const { data, loading } = useFeature('example')

if (loading) return <Loading />
return <div>{data}</div>
```

### Advanced Example
```typescript
// More complex example with multiple features
```

### Common Patterns
1. **Pattern 1:** When to use approach A
2. **Pattern 2:** When to use approach B

---

## Testing

### Unit Tests
Location: `src/__tests__/feature.test.ts`

Key test cases:
- Test case 1
- Test case 2

### E2E Tests
Location: `e2e/feature.spec.ts`

User flows covered:
- Flow 1
- Flow 2

---

## Performance Considerations

- Caching strategy
- Bundle size impact
- Optimization notes

---

## Known Limitations

- Limitation 1 and workaround
- Limitation 2 and workaround

---

## Future Enhancements

- [ ] Enhancement 1 (TASK-XXX)
- [ ] Enhancement 2 (TASK-XXX)

---

## Migration Guide

If this feature replaces or changes existing functionality:

**Before:**
```typescript
// Old way
```

**After:**
```typescript
// New way
```

---

## Troubleshooting

### Common Issues

**Issue 1: Error message**
- Cause: Why this happens
- Solution: How to fix it

**Issue 2: Unexpected behavior**
- Cause: Why this happens
- Solution: How to fix it

---

## Related Documentation

- [Link to related feature docs]
- [Link to architecture decisions]
- [External resources]
