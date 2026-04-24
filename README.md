# User Management Dashboard

## Description

This project is a full-stack user management dashboard.

Features:

- View users in a table with sorting and filtering.
- Pagination (10 users per page from server).
- Create, edit, and soft-delete users.
- Admin-only role assignment.
- User image upload (multer).
- Active/deactivated user states (soft delete history).

Default behavior:

- New users are created with role `student`.
- Only active users are shown by default.
- Deactivated users can also be queried.

## Tech Stack

- Frontend: React, Redux Toolkit, Material UI
- Backend: Node.js, Express, MongoDB, Mongoose
- Logging: Winston

## Prerequisites

- Node.js 18+ (or compatible LTS)
- npm
- MongoDB running locally (default) or a remote MongoDB URI

## Important Configuration

- Backend default port: `5000`
- Frontend dev server: `3000`
- Frontend proxy is configured to: `http://localhost:5000/`
- Default Mongo URI fallback: `mongodb://localhost:27017/usersManagement`

If you want to use custom environment values, create `server/.env`:

```bash
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
```

## Setup and Run (Bash Commands)

Run these commands from the project root (`user-management-dashboard`).

### 1. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 2. Install frontend dependencies

```bash
cd client
npm install --legacy-peer-deps
cd ..
```

Note: `--legacy-peer-deps` is used to avoid peer dependency conflicts in this dependency set.

### 3. Seed the database (optional, recommended for testing)

```bash
cd server
node seed
cd ..
```

This inserts demo users for testing.

### 4. Run backend

```bash
cd server
npm run start
```

Expected output includes:

- `Server started at port 5000`
- `MongoDB successfully connected...`

### 5. Run frontend (in a new terminal)

```bash
cd client
npm start
```

Open:

- `http://localhost:3000`

## Production Build (Frontend)

```bash
cd client
npm run build
```

## Common Troubleshooting

### Proxy error from frontend to backend (`ECONNREFUSED`)

If you see errors like:

- `Could not proxy request /api/users from localhost:3000 to http://localhost:5000/`

It means backend is not running. Start backend first:

```bash
cd server
npm run start
```

### `npm start` says missing script

You are likely in the wrong folder. Use:

```bash
cd client
npm start
```

for frontend, and:

```bash
cd server
npm run start
```

for backend.

## Notes

- Server-side errors are logged in the `server/logs` folder with date-based filenames.
- State management uses Redux Toolkit with `createAsyncThunk` for API calls.
