# Clerk Authentication for Startup MVP Builder

This project uses [Clerk](https://clerk.com/) for authentication in a Next.js App Router application.

## Setup Instructions

1. Create a Clerk account at https://clerk.com and set up a new application.

2. Copy your API keys from the Clerk dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

3. Add these keys to your `.env.local` file (already created in the project).

4. Configure your OAuth providers (optional):
   - Set up Google, GitHub, or other OAuth providers in the Clerk dashboard
   - Add the corresponding environment variables to your `.env.local` file

## Authentication Flow

The application uses Clerk's components and hooks:

- `middleware.ts` - Protects routes using `clerkMiddleware()`
- `app/layout.tsx` - Wraps the application with `<ClerkProvider>`
- Authentication UI:
  - Header shows sign in/sign up buttons for unauthenticated users
  - Header shows user button for authenticated users
  - Protected route at `/dashboard` requires authentication

## Protected Routes

The `/dashboard` route is protected using the `auth()` function from Clerk. Users who try to access this route without being signed in will be redirected to the sign-in page.

## Custom Sign In/Sign Up Pages

Custom sign-in and sign-up pages have been created at:
- `/app/sign-in/page.tsx`
- `/app/sign-up/page.tsx`

These pages use Clerk's `<SignIn>` and `<SignUp>` components for a seamless authentication experience.

## Authentication Components

The application uses the following Clerk components:

- `<SignInButton>` - Button to trigger the sign-in flow
- `<SignUpButton>` - Button to trigger the sign-up flow
- `<UserButton>` - Avatar and user menu for authenticated users
- `<SignedIn>` - Content that is only visible to signed-in users
- `<SignedOut>` - Content that is only visible to signed-out users

## Further Customization

Refer to the [official Clerk documentation](https://clerk.com/docs/nextjs/app-router) for more advanced customization options.
