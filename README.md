# TaskFlow

TaskFlow is a two-part productivity platform that pairs a Laravel 12 REST API with a custom React (Vite) front end. Authenticated users can create, edit, and delete blog entries with featured images, while the public site showcases curated articles and rich blog detail pages. The stack is wired with Laravel Sanctum tokens, TinyMCE editing, Tailwind styling, and React Router navigation.

## Highlights
- **Laravel API** – Sanctum-backed registration/login, per-user blog CRUD, and public blog feeds with media handling.
- **React SPA** – Authentication screens, private blog dashboard, public landing page, and animated blog reader experience.
- **Modern tooling** – Vite builds, Tailwind CSS, React Hook Form, Toast notifications, TinyMCE editor, and Font Awesome/Lucide icons.
- **Extensible foundation** – Ready for additional modules such as todos, profile settings, or richer editorial tooling.

## Project Structure

```text
.
├── app/                # Laravel application code (controllers, models, providers)
├── config/, database/, routes/, tests/  # Standard Laravel directories
├── public/             # Laravel public assets & storage symlink target
├── resources/          # Laravel Blade/Tailwind assets
├── taskflow-react/     # Standalone React SPA (Vite)
│   ├── src/            # React pages, routes, components, API client
│   └── package.json    # Front-end dependencies and scripts
├── composer.json       # PHP dependencies
└── package.json        # Minimal Vite/Tailwind setup for the Laravel UI (optional)
```

## Prerequisites
- PHP 8.2+
- Composer 2.6+
- Node.js 20+ and npm 10+
- A SQL database supported by Laravel (SQLite/MySQL/PostgreSQL, etc.)

## Backend Setup (Laravel)
1. Install dependencies:
   ```bash
   composer install
   ```
2. Copy environment template and configure it:
   ```bash
   cp .env.example .env
   ```
   Update the following keys at minimum:
   - `APP_URL=` (e.g., `http://localhost`)
   - Database credentials (`DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`)
   - `SANCTUM_STATEFUL_DOMAINS=` (e.g., `localhost:5173`)
   - `SESSION_DOMAIN=` (e.g., `localhost`)
3. Generate an application key:
   ```bash
   php artisan key:generate
   ```
4. Run database migrations (and optional seeders):
   ```bash
   php artisan migrate
   php artisan db:seed   # optional sample user
   ```
5. Create the storage symlink for uploaded blog images:
   ```bash
   php artisan storage:link
   ```
6. Start the API server:
   ```bash
   php artisan serve
   ```
   The API will be available at `http://127.0.0.1:8000`.

## Frontend Setup (React SPA)
1. Install dependencies:
   ```bash
   cd taskflow-react
   npm install
   ```
2. Create a `.env` file inside `taskflow-react/` and point the SPA at the Laravel API:
   ```bash
   echo "VITE_API_BASE_URL=http://127.0.0.1:8000/api" > .env.local
   ```
   Adjust the URL if you run the API elsewhere.
3. Run the development server:
   ```bash
   npm run dev
   ```
   The React app is served (by default) at `http://127.0.0.1:5173`.

## Available Scripts

### Laravel
- `php artisan serve` – Serve the API locally.
- `php artisan migrate:fresh --seed` – Reset the database with seed data.
- `php artisan test` – Execute the PHPUnit test suite.

### React SPA (`taskflow-react`)
- `npm run dev` – Start Vite in development mode with HMR.
- `npm run build` – Generate a production bundle.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint checks.

## Environment Reference

| Scope   | Variable                    | Purpose                                    |
|---------|-----------------------------|---------------------------------------------|
| Backend | `APP_URL`                   | Public URL of the Laravel application       |
| Backend | `FRONTEND_URL` *(optional)* | SPA URL for CORS / redirects                |
| Backend | `SANCTUM_STATEFUL_DOMAINS`  | Domains that should receive Sanctum cookies |
| Backend | `SESSION_DOMAIN`            | Base domain for session cookies             |
| Frontend| `VITE_API_BASE_URL`         | Base URL for all axiosClient API calls      |

## Key API Endpoints

| Method | Endpoint                    | Description                    | Auth |
|--------|-----------------------------|--------------------------------|------|
| POST   | `/api/auth/register`        | Register a new user            | ❌   |
| POST   | `/api/auth/login`           | Login and receive Sanctum token| ❌   |
| POST   | `/api/auth/logout`          | Revoke current token           | ✅   |
| GET    | `/api/blogs`                | List authenticated user blogs  | ✅   |
| POST   | `/api/blogs`                | Create a blog w/ image upload  | ✅   |
| PUT    | `/api/blogs/{blog}`         | Update a blog entry            | ✅   |
| DELETE | `/api/blogs/{blog}`         | Delete a blog and its image    | ✅   |
| GET    | `/api/public/blogs`         | Public blog index              | ❌   |
| GET    | `/api/public/blogs/{blog}`  | Public blog detail             | ❌   |

✅ – requires `Authorization: Bearer <token>` (Sanctum personal access token)

## Testing & Quality
- Backend tests: `php artisan test`
- Frontend linting: `npm run lint` within `taskflow-react`
- Manual test checklist:
  - Register, login, and logout flows
  - Blog CRUD operations (including image upload and deletion)
  - Public blog browsing and deep-link access

## Future Enhancements
- Harden validation/authorization rules across controllers.
- Implement slug-based routing and incremental static regeneration for public blogs.
- Replace the placeholder todo endpoint/page with real functionality.
- Add component/integration tests (Jest/React Testing Library) for the SPA.

## License

This project uses the MIT license. See the `LICENSE` file or header notices where applicable.
