# Cinematik-SSR Project Context

## Project Goal

Build **CINEMATIK**, a modern web application for movies and TV shows using Next.js 16 and React 19. The app allows users to:
- Search, browse, and filter movies/TV shows
- Read and write reviews and ratings
- Manage a personal library/favorites
- Maintain a personal profile with authentication
- Enjoy a responsive and visually attractive UI

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server/Client Components)
- **UI Kit:** MUI (Material-UI) with Emotion for styling
- **Forms:** TanStack Form
- **State Management:** Zustand (UI state) and TanStack Query (API state)
- **Authentication:** next-auth (JWT-based session, social login support)
- **APIs:** Internal REST API (profile, reviews, user, library, etc.) + external APIs (IMDb)
- **i18n:** next-intl
- **Linting/Formatting:** biome, husky, commitlint, pre-commit hooks

## File/Folder Structure

- `src/app/`: Next.js App directory
    - (auth): Auth flows (login, signup, reset/forgot password)
    - (landing): Landing, public home, reviews page
    - app/: The main single-page area (`/home`, `/movies/[movieId]`, `/profile`, `/search`)
- `src/components/`: MUI-based and custom components for the app, grouped by domain and function
- `src/services/`: API service wrappers for movies, user, reviews, library, etc.
- `src/hooks/`: Custom hooks for filtering, state, logic
- `src/types/`: Typescript types, interfaces, and enums (movies, reviews, user, library)
- `src/libs/`: Axios instance, utils (API clients, error helpers, etc.)
- `src/providers/`: React context/providers for Auth, Style, Emotion, Query, etc.

## Features Implemented

- User authentication (login, registration, social login, password reset)
- Home dashboard/feed with trending, top categories (movies/TV), personalized picks
- Movie/TV show list and detail pages (cast, trailers, reviews, related titles)
- Personal library management (add/remove from favorites/library)
- Review system (write, edit, delete reviews and ratings)
- User profile/settings (name, email, language, change password)
- Fully responsive, MUI-based design - adaptive for desktop, tablet, mobile

## Current Implementation Status

### ✅ Core functionality present:
- Authentication (next-auth)
- Reviews (CRUD with validation, TanStack Form + MUI form components)
- Movies/TV: browse, search, detail pages, categories/filters, library
- Profile/settings
- Modern MUI-based responsive design (Emotion theming/custom palette)
- Social login flow (Google)
- Robust error handling (ErrorHelper; MUI alerts/toasts)

### 🔄 In Progress/Planned:
- Expanding IMDB-based movie search
- Advanced filters
- Notifications (react-toastify + MUI Alerts)
- A11y and visual polish
- Further domain-specific sections beyond movies/TV/reviews

## API & Service Conventions

- All HTTP via a centralized **axios** client, with domain-based wrappers (see `src/services/{domain}/service.ts`)
- API response types: `IApiResponse<T>`, `IPaginatedResponse<T>`
- Authentication via next-auth (server/client harmony)
- IMDB API used for movie/TV metadata
- Separation between internal (profile, reviews, library) and external (imdb) endpoints

## Type Conventions

- Major models defined in `src/types/`
- Strict typing throughout, leveraging TypeScript’s utility types and enums
- UI enums (e.g. `ContentType`, `ScreenType`, `SearchType`) for business logic and UI state

## Code Quality & Development Practices

- MUI for all input, dialog, layout, feedback, buttons (no shadcn/ui)
- Emotion for custom styling/theming on MUI base
- TanStack Form for non-trivial forms (validation with Zod), native for simple
- Modern Next.js App Router patterns: Route Groups, dynamic segments, Server/Client component split
- State handled by Zustand (local) and React Query (remote/server)
- ESLint/biome, Prettier, commitlint, husky for quality
