# Docker Setup Guide - UserManagement MERN Stack

## Overview

This project is configured with production-grade Docker containerization following best practices. The setup includes:

- **Frontend**: Multi-stage build with Vite + React served by Nginx
- **Backend**: Node.js production server with Alpine base image
- **MongoDB**: Official MongoDB Alpine image with persistent volumes
- **Networking**: Isolated bridge network for service-to-service communication
- **Logging**: Centralized JSON logging with rotation limits

## Project Structure

```
UserManagement/
├── docker-compose.yml          # Root compose file for full stack
├── .env.example               # Environment variables template
├── client/
│   ├── Dockerfile             # Multi-stage React build
│   ├── nginx.conf             # Nginx configuration with API proxy
│   ├── .dockerignore          # Files to exclude from container
│   ├── .env.example           # Frontend env template
│   └── package.json
├── server/
│   ├── Dockerfile             # Node.js production container
│   ├── .dockerignore          # Files to exclude from container
│   ├── .env.example           # Backend env template
│   ├── package.json
│   └── index.js
```

## Quick Start

### Prerequisites

- Docker 20.10+
- Docker Compose 1.29+

### 1. Clone and Setup

```bash
# Navigate to project root
cd UserManagement

# Copy environment file and update if needed
cp .env.example .env
```

### 2. Run the Stack

```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up --build -d
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

### 4. View Logs

```bash
# View all services
docker-compose logs -f

# View specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongo
```

### 5. Stop the Stack

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (reset database)
docker-compose down -v
```

## Environment Variables

### Root `.env` File

Create `.env` in the project root:

```bash
NODE_ENV=production
FRONTEND_PORT=3000
BACKEND_PORT=5000
MONGO_PORT=27017
MONGO_INITDB_DATABASE=usersManagement
MONGO_URI=mongodb://mongo:27017/usersManagement
JWT_SECRET=your-secret-key-here
```

**Important**: Change `JWT_SECRET` to a secure value in production!

### Backend Configuration

The backend uses environment variables from `docker-compose.yml`:

- `NODE_ENV`: Application environment (production/development)
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret

## Architecture Details

### Frontend (client/)

**Build Process:**
1. Node 20 Alpine base for building
2. Install dependencies with `npm ci`
3. Build Vite app: `npm run build`
4. Copy built files to Nginx Alpine container
5. Configure Nginx with:
   - Security headers (X-Frame-Options, CSP, etc.)
   - Gzip compression
   - API proxy to backend service
   - SPA routing (all unmatched routes → index.html)
   - Static asset caching (1 year for versioned files)

**Nginx Configuration:**
- Proxies `/api/*` → `http://backend:5000`
- Proxies `/uploadImage/*` → `http://backend:5000`
- Proxies `/images/*` → `http://backend:5000`
- Health check via `/` endpoint

**Image Optimization:**
- Multi-stage build eliminates build dependencies
- Final image size: ~30-40MB (Nginx + static assets)
- Alpine base: ~10MB

### Backend (server/)

**Build Process:**
1. Node 20 Alpine base (minimal size)
2. Install dumb-init for proper signal handling
3. Install production dependencies only (`--only=production`)
4. Copy application code
5. Create non-root `nodejs` user for security
6. Expose port 5000

**Key Features:**
- Production start: `node index.js` (direct execution)
- Development start: `npm run dev` (uses nodemon for hot reload)
- Health check via `/api/users` endpoint
- Proper signal handling with dumb-init
- Non-root user execution

**Image Optimization:**
- Alpine base: ~47MB
- Final image size: ~100-120MB
- Only production dependencies included
- Cache cleanup: `npm cache clean --force`

### MongoDB (mongo/)

**Configuration:**
- Official MongoDB 7.0 Alpine image
- Persistent volumes:
  - `mongo_data`: Data storage
  - `mongo_config`: Configuration storage
- Health check using mongosh
- Auto-restart on failure

**Persistence:**
- Database files persisted in named volume `mongo_data`
- Survives container restart and recreation

## Networking

**Network**: `usermanagement-network` (bridge)

Service DNS names (container-to-container):
- `mongo` → MongoDB (port 27017)
- `backend` → Backend API (port 5000)
- `frontend` → Frontend (port 80)

All services can communicate using service names.

## Volume Mounts

| Service | Host Path | Container Path | Purpose |
|---------|-----------|-----------------|---------|
| backend | `./server/images` | `/app/images` | User uploaded images |
| backend | `./server/logs` | `/app/logs` | Application logs |
| mongo | named volume | `/data/db` | Database files |
| mongo | named volume | `/data/configdb` | MongoDB config |

## Best Practices Implemented

### Security

✅ Non-root user execution (frontend: nginx, backend: nodejs)
✅ Security headers in Nginx (X-Frame-Options, X-Content-Type-Options, etc.)
✅ Alpine base images (smaller attack surface)
✅ Environment variables for sensitive data (no hardcoding)
✅ Health checks for all services

### Performance

✅ Multi-stage builds (eliminates build tools from final image)
✅ Layer caching optimization (dependencies first, then code)
✅ Alpine base images (minimal size)
✅ Gzip compression in Nginx
✅ Static asset caching with versioning
✅ Minimal production dependencies

### Reliability

✅ Health checks for all services
✅ Service dependencies (`depends_on: condition: service_healthy`)
✅ Restart policy: `unless-stopped`
✅ Dumb-init for proper signal handling
✅ Logging limits (10MB per file, 3 files max)

### CI/CD Ready

✅ Stateless containers (no local dependencies)
✅ Environment variable driven configuration
✅ No hardcoded secrets
✅ Reproducible builds
✅ Docker Compose for easy testing

### Kubernetes Ready

✅ Stateless application design
✅ Exposed health check endpoints
✅ Proper port configuration
✅ Environment variable usage
✅ Persistent volume support (MongoDB)

## Common Tasks

### Rebuild Images After Code Changes

```bash
# Rebuild specific service
docker-compose build backend

# Rebuild all services
docker-compose build

# Rebuild and restart
docker-compose up --build
```

### Access Container Shell

```bash
# Backend shell
docker-compose exec backend sh

# Frontend shell
docker-compose exec frontend sh

# MongoDB shell
docker-compose exec mongo mongosh
```

### View Service Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend

# Last 50 lines
docker-compose logs --tail=50
```

### Check Service Status

```bash
docker-compose ps
```

### Reset Database (Remove MongoDB Volume)

```bash
# Stop and remove everything including volumes
docker-compose down -v
```

### Run Database Seeds

```bash
# In development (local machine)
cd server
node seed.js

# In container
docker-compose exec backend node seed.js
```

## Troubleshooting

### Port Already in Use

**Problem:** `Error: bind: address already in use`

**Solution:**
```bash
# Change port in .env
FRONTEND_PORT=3001
BACKEND_PORT=5001
```

Then restart:
```bash
docker-compose down
docker-compose up --build -d
```

### MongoDB Connection Failed

**Problem:** Backend can't connect to MongoDB

**Verification:**
```bash
# Check if mongo is running
docker-compose ps

# Check MongoDB logs
docker-compose logs mongo

# Verify backend can reach mongo
docker-compose exec backend ping mongo
```

### Frontend Can't Reach Backend

**Problem:** API requests failing in frontend

**Solution:**
1. Verify backend is running: `docker-compose ps`
2. Check Nginx configuration
3. Verify MONGO_URI in .env is correct

### Image Build Fails

**Problem:** `docker-compose build` fails

**Solution:**
```bash
# Rebuild with no cache
docker-compose build --no-cache

# Check Docker disk space
docker system df

# Prune unused images/containers
docker system prune -a
```

## Production Deployment Checklist

- [ ] Change JWT_SECRET to a strong random value
- [ ] Set NODE_ENV=production in all environments
- [ ] Configure external MongoDB (or use managed MongoDB service)
- [ ] Set up proper backup strategy for MongoDB
- [ ] Configure logging aggregation (ELK, CloudWatch, etc.)
- [ ] Set up monitoring and alerts
- [ ] Configure SSL/TLS certificate for Nginx
- [ ] Set up reverse proxy/load balancer
- [ ] Configure rate limiting
- [ ] Set up API key authentication if needed
- [ ] Enable CORS properly for your domain
- [ ] Regular security scanning of images

## Next Steps: Kubernetes Deployment

This Docker setup is ready for Kubernetes deployment:

1. **Push images to registry:**
   ```bash
   docker tag usermanagement-backend:latest your-registry/usermanagement-backend:1.0
   docker push your-registry/usermanagement-backend:1.0
   ```

2. **Create Kubernetes manifests:**
   - Deployment for each service
   - Service for inter-pod communication
   - Persistent Volume Claims for MongoDB
   - ConfigMap for environment variables
   - Secret for sensitive data (JWT_SECRET)
   - Ingress for external access

## Next Steps: Jenkins CI/CD

For Jenkins integration:

1. **Dockerfile stage in Jenkinsfile:**
   ```groovy
   stage('Build') {
       steps {
           sh 'docker-compose build'
       }
   }
   ```

2. **Push to registry:**
   ```groovy
   stage('Push') {
       steps {
           sh 'docker tag usermanagement-backend:latest registry/backend:${BUILD_NUMBER}'
           sh 'docker push registry/backend:${BUILD_NUMBER}'
       }
   }
   ```

3. **Deploy:**
   ```groovy
   stage('Deploy') {
       steps {
           sh 'docker-compose -f docker-compose.prod.yml up -d'
       }
   }
   ```

## Support & Documentation

For more information:
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
