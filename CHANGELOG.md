# Changelog

## v2.0.1

### Environment Variables

- Renamed `NEXT_PUBLIC_SEQUENCE_ACCESS_KEY` to `NEXT_PUBLIC_ACCESS_KEY`
- Renamed `NEXT_PUBLIC_SEQUENCE_PROJECT_ID` to `NEXT_PUBLIC_PROJECT_ID`

### Dependencies

- Updated SDK packages to latest versions
  - @0xsequence/checkout to v5.2.1
  - @0xsequence/connect to v5.2.1
  - @0xsequence/wallet-widget to v5.2.1
  - @0xsequence/marketplace-sdk to v0.8.7
- Updated development dependencies

### Collection filters

- Replaced custom filter implementation with new marketplace-SDK filter helpers
- Improved filter performance and responsiveness

### Time Display

- Removed date-fns, and replaced with custom time functions
- Fixed hydration errors on time components

### Developer Experience

- Added VSCode recommended extensions and settings

### UI Improvements

- Better mobile view for collection search
- Enhanced sidebar layout with clearer section separation
- Improved loading states throughout the application
