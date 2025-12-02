# NextJS Starterkit

A production-ready Next.js 16 starter template with authentication, dashboard, and modern tooling built-in.

## Features

- **Next.js 16** with App Router and React 19
- **Authentication** powered by [Better Auth](https://better-auth.com/)
  - Email/Password authentication
  - Social login (Google, GitHub)
  - Two-Factor Authentication (2FA) with TOTP
  - Email verification
  - Password reset flow
  - Session management
- **Database** with Prisma ORM and PostgreSQL
- **Type-safe APIs** with tRPC and TanStack React Query
- **UI Components** built with Radix UI primitives (shadcn/ui style)
- **Styling** with Tailwind CSS 4
- **Dark/Light Theme** support via next-themes
- **Type-safe Environment Variables** with @t3-oss/env-nextjs and Zod validation
- **Form Handling** with TanStack React Form

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript 5 |
| Database | PostgreSQL, Prisma 7 |
| Authentication | Better Auth |
| API | tRPC |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI, Lucide Icons |
| Form Management | TanStack React Form |
| State Management | TanStack React Query |
| Validation | Zod |

## Project Structure

```
├── app/
│   ├── (dashboard)/           # Protected dashboard routes
│   │   ├── _components/       # Dashboard-specific components
│   │   ├── dashboard/         # Main dashboard page
│   │   └── settings/          # User settings
│   │       ├── appearance/    # Theme settings
│   │       ├── password/      # Password change
│   │       ├── profile/       # Profile management
│   │       ├── sessions/      # Active sessions
│   │       └── two-factor-auth/ # 2FA configuration
│   ├── (legal)/               # Legal pages (terms, privacy)
│   ├── api/                   # API routes
│   ├── auth/                  # Authentication pages
│   │   ├── (public-only)/     # Public auth routes
│   │   │   ├── 2fa/           # 2FA verification
│   │   │   ├── forgot-password/
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   └── reset-password/    # Password reset
│   └── support/               # Support page
├── components/
│   ├── ui/                    # Reusable UI components
│   └── ...                    # Shared components
├── generated/                 # Generated Prisma client
├── hooks/                     # Custom React hooks
├── lib/
│   ├── auth.ts               # Better Auth configuration
│   ├── auth-client.ts        # Auth client utilities
│   ├── mail-sender.ts        # Email sending utilities
│   ├── mail-template.ts      # Email templates
│   ├── prisma.ts             # Prisma client instance
│   ├── trpc/                 # tRPC configuration
│   └── utils.ts              # Utility functions
├── prisma/
│   ├── migrations/           # Database migrations
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nextjs-starterkit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file and configure your variables:

   ```bash
   cp example.env .env
   ```

4. **Configure your `.env` file**

   ```env
   # Database Configuration
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname

   # Better Auth Configuration
   BETTER_AUTH_SECRET=your-secret-key-min-32-characters
   BETTER_AUTH_URL=http://localhost:3000

   # Email Verification (optional)
   AUTH_REQUIRED_EMAIL_VERIFICATION=true

   # Social Login (optional)
   AUTH_GOOGLE_CLIENT_ID=
   AUTH_GOOGLE_CLIENT_SECRET=
   AUTH_GITHUB_CLIENT_ID=
   AUTH_GITHUB_CLIENT_SECRET=

   # Feature Flags
   NEXT_PUBLIC_AUTH_ENABLE_2FA=true
   NEXT_PUBLIC_AUTH_ENABLE_GOOGLE=true
   NEXT_PUBLIC_AUTH_ENABLE_GITHUB=true

   # App Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME="NextJS Starterkit"
   NEXT_PUBLIC_DEFAULT_AUTHENTICATED_PAGE=/dashboard
   NEXT_PUBLIC_DEFAULT_UNAUTHENTICATED_PAGE=/auth/sign-in
   ```

5. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following Prisma models:

- **User** - User accounts with email, name, and 2FA settings
- **Session** - Active user sessions with device info
- **Account** - OAuth provider accounts linked to users
- **Verification** - Email/password verification tokens
- **TwoFactor** - TOTP secrets and backup codes for 2FA

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Authentication Features

### Email/Password

- User registration with email verification
- Secure password hashing
- Password reset via email

### Social Login

- Google OAuth integration
- GitHub OAuth integration
- Automatic account linking

### Two-Factor Authentication

- TOTP-based 2FA
- QR code setup
- Backup codes for recovery

### Session Management

- View active sessions
- Device and location info
- Remote session termination

## Environment Variables

### Server-side Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Yes | Secret key for auth (min 32 chars) |
| `BETTER_AUTH_URL` | Yes | Base URL of your application |
| `AUTH_REQUIRED_EMAIL_VERIFICATION` | No | Require email verification (default: false) |
| `AUTH_GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `AUTH_GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret |
| `AUTH_GITHUB_CLIENT_ID` | No | GitHub OAuth client ID |
| `AUTH_GITHUB_CLIENT_SECRET` | No | GitHub OAuth client secret |

### Client-side Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL |
| `NEXT_PUBLIC_APP_NAME` | No | Application name |
| `NEXT_PUBLIC_AUTH_ENABLE_2FA` | No | Enable 2FA feature (default: false) |
| `NEXT_PUBLIC_AUTH_ENABLE_GOOGLE` | No | Enable Google login |
| `NEXT_PUBLIC_AUTH_ENABLE_GITHUB` | No | Enable GitHub login |
| `NEXT_PUBLIC_DEFAULT_AUTHENTICATED_PAGE` | No | Redirect after login (default: /dashboard) |
| `NEXT_PUBLIC_DEFAULT_UNAUTHENTICATED_PAGE` | No | Redirect when not logged in (default: /auth/sign-in) |

## Docker Support

A `docker-compose.yml` is included for local PostgreSQL development:

```bash
docker-compose up -d
```

## Deployment

### Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

### Self-hosted

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm run start
   ```

## Customization

### Adding New UI Components

The project uses Radix UI primitives. Components are located in `components/ui/`. You can add new components following the existing patterns.

### Adding New tRPC Routes

1. Create a new router in `lib/trpc/`
2. Add procedures with input validation using Zod
3. Register the router in the main app router

### Modifying Auth Configuration

Auth settings are in `lib/auth.ts`. You can:

- Enable/disable features
- Add new social providers
- Customize email templates in `lib/mail-template.ts`

## License

This project is open source and available under the [MIT License](LICENSE).
