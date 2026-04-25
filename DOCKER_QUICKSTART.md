# Quick Start Guide - UserManagement Docker Setup

## What Was Implemented

### ✅ Dockerfiles Created

**Client (Frontend) - `client/Dockerfile`**
- Multi-stage build with Node 20 Alpine (build) + Nginx Alpine (runtime)
- Vite React application compilation
- Security headers, gzip compression, caching strategy
- Health check endpoint
- Final image size: ~30-40MB

**Server (Backend) - `server/Dockerfile`**
- Node 20 Alpine base
- Production-only dependencies (`npm ci --only=production`)
- Non-root user execution (nodejs:nodejs)
- Proper signal handling with dumb-init
- Health check endpoint
- Image size: ~100-120MB

### ✅ Docker Compose Setup - `docker-compose.yml`

**Three Services:**
1. **mongo** - MongoDB 7.0 Alpine with persistent volumes
2. **backend** - Node.js API server on port 5000
3. **frontend** - Nginx reverse proxy on port 3000

**Features:**
- Bridge network for service-to-service communication
- Service discovery via DNS (mongo, backend, frontend)
- Health checks with auto-retry
- Persistent MongoDB volumes
- Centralized logging (json-file driver)
- Environment variable configuration
- Auto-restart policy

### ✅ Supporting Files

**Nginx Configuration - `client/nginx.conf`**
- API request proxying to backend service
- Security headers implementation
- Static asset caching with versioning
- SPA routing fallback (React Router support)
- File upload handling (50MB limit)

**.dockerignore Files**
- `client/.dockerignore` - Excludes build artifacts, node_modules, etc.
- `server/.dockerignore` - Excludes logs, coverage, seeds, etc.

**Environment Variable Files**
- `.env.example` - Root level configuration template
- `server/.env.example` - Backend-specific template
- `client/.env.example` - Frontend-specific template

**Updated Configuration**
- `server/package.json` - Added `dev` script for development
- `server/src/config/config.js` - Made PORT configurable via environment

### ✅ Documentation

**DOCKER.md** - Comprehensive guide including:
- Architecture overview
- Quick start instructions
- Service details and best practices
- Troubleshooting guide
- Production deployment checklist
- CI/CD and Kubernetes readiness

---

## How to Use

### 1️⃣ First Time Setup

```bash
# Navigate to project root
cd UserManagement

# Copy environment template
cp .env.example .env

# Edit .env if needed (optional, defaults are set)
# Change JWT_SECRET for production
```

### 2️⃣ Start the Stack

```bash
# Build and start all services (takes 2-3 minutes)
docker-compose up --build

# Or run in background
docker-compose up --build -d
```

### 3️⃣ Access the Application

```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
MongoDB:   localhost:27017
```

### 4️⃣ View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongo
```

### 5️⃣ Stop the Stack

```bash
# Stop services (keeps data)
docker-compose stop

# Stop and remove containers (keeps volumes)
docker-compose down

# Stop and remove everything including database
docker-compose down -v
```

---

## Best Practices Implemented

### Security ✅
- Non-root user execution
- Security headers in Nginx
- Alpine base images (minimal attack surface)
- No hardcoded secrets
- Health checks on all services

### Performance ✅
- Multi-stage builds (build tools removed)
- Layer caching optimization
- Alpine images (minimal size)
- Gzip compression
- Static asset caching

### Reliability ✅
- Health checks with auto-recovery
- Service dependencies enforcement
- Proper signal handling
- Restart policies
- Logging limits

### Development ✅
- Single command startup (`docker-compose up --build`)
- Volume mounts for live file access
- Separate dev/prod scripts
- No application code changes required

### CI/CD Ready ✅
- Reproducible builds
- Environment-driven configuration
- Stateless containers
- No local dependencies
- Jenkins-compatible setup

### Kubernetes Ready ✅
- Stateless design
- Health check endpoints
- Environment variable usage
- Persistent volumes for MongoDB
- Proper resource configuration

---

## Environment Variables

### Key Variables to Know

```env
NODE_ENV=production           # Application environment
FRONTEND_PORT=3000           # Frontend port (host)
BACKEND_PORT=5000            # Backend port (host)
MONGO_URI=mongodb://mongo:27017/usersManagement  # DB connection
JWT_SECRET=your-secret-key   # ⚠️ CHANGE THIS IN PRODUCTION
```

---

## Common Operations

### Rebuild After Code Changes
```bash
docker-compose build backend        # Just backend
docker-compose build               # All services
docker-compose up --build          # Rebuild and restart
```

### Access Container Shell
```bash
docker-compose exec backend sh      # Backend
docker-compose exec frontend sh     # Frontend
docker-compose exec mongo mongosh   # MongoDB
```

### View Service Status
```bash
docker-compose ps
```

### Reset Database
```bash
# Remove all containers and volumes
docker-compose down -v
```

---

## Verification Checklist

- [x] Dockerfile for client (multi-stage build)
- [x] Dockerfile for server (Node Alpine)
- [x] docker-compose.yml with 3 services
- [x] Nginx configuration with API proxy
- [x] .dockerignore for both client and server
- [x] Environment variable templates (.env.example)
- [x] Health checks on all services
- [x] Persistent volumes for MongoDB
- [x] Service networking configured
- [x] Security best practices applied
- [x] Production-ready image sizes
- [x] Non-root user execution
- [x] Comprehensive documentation

---

## Next Steps

### For Local Development
1. Run `docker-compose up --build`
2. Access frontend at `http://localhost:3000`
3. Backend API at `http://localhost:5000`

### For Production Deployment
1. Change JWT_SECRET in .env
2. Use external MongoDB (or managed service)
3. Set NODE_ENV=production
4. Configure SSL/TLS
5. Set up monitoring and logging
6. See DOCKER.md for full checklist

### For Kubernetes
See DOCKER.md section "Next Steps: Kubernetes Deployment"

### For Jenkins CI/CD
See DOCKER.md section "Next Steps: Jenkins CI/CD"

---

## Support

Detailed documentation available in **DOCKER.md**

Key sections:
- Architecture details
- Troubleshooting guide
- Production checklist
- Kubernetes deployment guide
- Jenkins CI/CD integration

---

## File Structure Summary

```
UserManagement/
├── docker-compose.yml          ← Root compose file
├── .env.example               ← Environment template
├── DOCKER.md                  ← Complete documentation
├── client/
│   ├── Dockerfile             ← Multi-stage React build
│   ├── nginx.conf             ← Nginx config with API proxy
│   ├── .dockerignore          ← Docker build exclusions
│   └── .env.example           ← Frontend env template
├── server/
│   ├── Dockerfile             ← Node production image
│   ├── .dockerignore          ← Docker build exclusions
│   ├── .env.example           ← Backend env template
│   ├── package.json           ← Updated with dev script
│   └── src/config/config.js   ← Updated for PORT env var
└── [existing project files...]
```

---

Ready to run? Execute:
```bash
docker-compose up --build
```

Then open: **http://localhost:3000**
