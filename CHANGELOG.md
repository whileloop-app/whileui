# Changelog

## [1.0.0] - 2026-02-22

### Breaking

- **Auth blocks removed from core:** SignInForm, SignUpForm, ForgotPasswordForm, ResetPasswordForm, VerifyEmailForm, SocialConnections, UserMenu are no longer exported from `@thewhileloop/whileui`.
- **Profile blocks removed from core:** ProfileHeader, SettingsSection, SettingsItem, AccountCard are no longer exported from `@thewhileloop/whileui`.

**Migration:** Copy the template files from `apps/showcase/templates/auth/` and `apps/showcase/templates/profile/` into your app. Each template imports primitives from `@thewhileloop/whileui`; wire callbacks to your auth/settings logic. See README "Blocks Strategy: Core vs Templates" section.

### Added

- Copy-paste templates for auth and profile blocks in `apps/showcase/templates/`.
- BLOCKS_STRATEGY documentation in README explaining core vs template approach.
