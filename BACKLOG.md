# 📋 Feature Backlog - Next.js Starter Kit

> **Last Updated:** November 30, 2025  
> **Project:** Next.js Starter Kit  
> **Version:** 1.0.0  
> **Tech Stack:** Next.js, tRPC, Prisma, PostgreSQL, shadcn/ui, Tailwind CSS, TanStack Query, TanStack Form, better-auth

---

## 📝 Backlog

### Core infrastructure

- [x] tRPC setup
- [x] Prisma ORM with PostgreSQL
- [x] TanStack Query integration
- [x] TanStack Form integration
- [x] Tailwind CSS v4
- [x] shadcn/ui components
- [x] Email sender integration

---

### Authentication system (better-auth)

#### Sign In

- [x] Sign in page
- [x] Sign in email password
- [x] Sign in Google
- [x] Sign in GitHub

#### Sign Up

- [x] Sign up page
- [x] Sign up email password
- [x] Sign up email verification
- [ ] Sign up resend email verification
- [x] Success email verification page
- [x] Invalid email verification page
- [x] Sign up Google
- [x] Sign up GitHub

#### Forgot Password

- [x] Forgot password page
- [x] Forgot password email verification
- [x] Reset password page
- [x] Success reset password page
- [x] Invalid reset password page

---

### User Settings

#### Profile

- [x] Update Profile
  - [x] Update Avatar
  - [x] Update Name
- [x] Update Email (email verification)
- [x] Delete Account (email verification)

#### Security

- [x] Password management
  - [X] Update Password
- [ ] Two-factor authentication (2FA)
- [/] Session management
  - [x] Active sessions page
  - [/] Device management
  - [/] Revoke sessions

#### Appearance

- [x] Theme (Dark/Light/System)
- [ ] Account preferences
  - [ ] Language selection
  - [ ] Timezone settings
  - [ ] Date/time format preferences

---

### Dashboard

- [x] Dashboard layout
  - [ ] Dashboard page example

---

### Legal Pages

- [x] Terms of Service
- [x] Privacy Policy

---

### Support

- [ ] Support page

---

### 🔒 Security Improvements

- [ ] Security audit
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] XSS prevention
- [ ] SQL injection prevention
- [ ] Dependency security updates
- [ ] Environment variable validation
- [ ] Secure headers (CSP, HSTS, etc.)

---

## 📝 Documentation

### ✍️ To Be Documented

- [ ] Project setup guide
- [ ] Development guidelines
- [ ] Code style guide
- [ ] Git workflow
- [ ] Deployment guide
- [ ] Environment variables documentation
- [ ] Database schema documentation
- [ ] API endpoints documentation
- [ ] Component library documentation
- [ ] Troubleshooting guide

---

## 💭 Ideas for Consideration

- [ ] Multi-tenancy support
- [ ] White-label capabilities
- [ ] Import/export user data
- [ ] Audit logs
- [ ] Backup and restore functionality
- [ ] A/B testing framework
- [ ] Feature flags system
- [ ] Rate limiting per user/plan
- [ ] Custom domain support
- [ ] Referral program
- [ ] Affiliate system
- [ ] Feedback widget
- [ ] In-app announcements
- [ ] Maintenance mode
- [ ] Status page

---

## 📊 Priority Legend

| Priority | Description | Timeline |
|----------|-------------|----------|
| **High** | Critical features needed for MVP or user-facing issues | 1-4 weeks |
| **Medium** | Important features that enhance user experience | 1-3 months |
| **Low** | Nice-to-have features for future releases | 3+ months |

---

## 🏷️ Labels

- 🔐 **Auth** - Authentication & security features
- 👤 **User** - User management
- 📧 **Email** - Email & notifications
- 📊 **Dashboard** - Dashboard features
- 🎨 **UI/UX** - Interface improvements
- 🔔 **Communication** - Contact & support
- 📁 **Files** - File management
- 🛠️ **DevEx** - Developer experience
- 💳 **Payments** - Billing & subscriptions
- 🌍 **i18n** - Internationalization
- 🔍 **Search** - Search & filtering
- 📱 **PWA** - Progressive Web App
- 🤖 **AI** - AI/ML features
- 📈 **Analytics** - Analytics & insights
- 🔗 **Integrations** - Third-party integrations

---

## 📌 Notes

- This backlog is a living document and should be updated regularly
- Features should be broken down into smaller tasks before implementation
- Always consider security, performance, and accessibility when implementing features
- Get user feedback before implementing low-priority features
- Keep the codebase clean and maintainable

---

**Contributors:** Add your name when you work on features from this backlog
