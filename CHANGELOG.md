# Changelog

## [1.1.0] - 2026-02-22

### Added

- **PageSkeleton:** Variant-based page layouts (dashboard, list, settings, card, generic). Composes Skeleton, Stack, Row, View. Props: `variant`, `count`, `padding`, `className`.

## [1.0.1] - 2026-02-22

### Fixed

- **Android font distortion (B, D, P, R):** Bold/semibold custom fonts rendered incorrectly on Android due to synthetic bold when `fontWeight` was passed with `fontFamily`. Now `useResolveFontFamily` applies only `fontFamily` via the style prop (no `fontWeight`). Apps using custom fonts must wrap the app in `FontProvider` with a `FontFamilyMap`.

## [1.0.0] - 2026-02-22

### Breaking

- **Auth blocks removed from core:** SignInForm, SignUpForm, ForgotPasswordForm, ResetPasswordForm, VerifyEmailForm, SocialConnections, UserMenu are no longer exported from `@thewhileloop/whileui`.
- **Profile blocks removed from core:** ProfileHeader, SettingsSection, SettingsItem, AccountCard are no longer exported from `@thewhileloop/whileui`.

**Migration:** Copy the template files from `apps/showcase/templates/auth/` and `apps/showcase/templates/profile/` into your app. Each template imports primitives from `@thewhileloop/whileui`; wire callbacks to your auth/settings logic. See README "Blocks Strategy: Core vs Templates" section.

### Added

- Copy-paste templates for auth and profile blocks in `apps/showcase/templates/`.
- BLOCKS_STRATEGY documentation in README explaining core vs template approach.
