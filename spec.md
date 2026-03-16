# Creator Intelligence

## Current State
The profile form has dedicated URL fields for: Instagram, TikTok, YouTube, Twitter/X, Newsletter, Blog, and Podcast. None of these have a content type field. Facebook is not currently an option in the links section. The backend `CreatorProfile` type stores optional URL strings for each platform.

## Requested Changes (Diff)

### Add
- `facebookUrl` optional field to `CreatorProfile` backend type
- `facebookContentType` optional field to `CreatorProfile` backend type (e.g. personal profile, business page, group, creator page)
- Facebook URL input field in `ProfileForm`, styled and positioned the same as the Instagram field
- Facebook content type input (text or select) below the Facebook URL field in `ProfileForm`
- Facebook icon/badge in `ProfilePage` Connected Platforms section

### Modify
- `createProfile` backend method: add two new optional parameters (`facebookUrl`, `facebookContentType`)
- `getProfiles` return type: include `facebookUrl` and `facebookContentType` in returned profile objects
- `ProfileForm` props interface: add `facebookUrl` and `facebookContentType` fields
- `ProfilePage` edit form initial data: pass `facebookUrl` and `facebookContentType`
- `getProfileLinks` helper: include Facebook in the links list
- `PLATFORM_ICONS` and `getPlatformLabel`: add Facebook entry

### Remove
- Nothing removed

## Implementation Plan
1. Regenerate Motoko backend to add `facebookUrl` and `facebookContentType` to `CreatorProfile` type and `createProfile` parameters
2. Update `ProfileForm.tsx`: add state for `facebookUrl` and `facebookContentType`, add dedicated URL input + content type select in the grid, include in `onSubmit` data
3. Update `ProfilePage.tsx`: add Facebook to `PLATFORM_ICONS`, `getPlatformLabel`, `getProfileLinks`, and pass the new fields in edit form `initialData`
4. Update any hooks/query wrappers that map profile data
