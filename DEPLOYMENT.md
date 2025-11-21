# SimpleLogbook Deployment Guide (TrueNAS)

This guide describes step-by-step how to deploy the SimpleLogbook application on a TrueNAS server.

The application is built with **Next.js** and uses an **SQLite** database.

## Requirements

*   TrueNAS Server (Scale or Core)
*   Terminal access (SSH) or Portainer/Docker (for TrueNAS Scale)
*   Git installed (optional, files can be uploaded manually)

---

## Method 1: Docker (Recommended for TrueNAS Scale)

The easiest way to run the application is using Docker. The application comes with ready-to-use `Dockerfile` and `docker-compose.yml` files.

### Step 1: Get the code

Log in via SSH to your TrueNAS server (or open Shell in GUI). Navigate to the directory where you want to keep the application (e.g., `/mnt/pool/apps`).

```bash
git clone https://github.com/czekanskyy/SimpleLogbook.git
cd SimpleLogbook
```

### Step 2: Configuration

Open `docker-compose.yml` and adjust environment variables if necessary.

*   `AUTH_SECRET`: Generate a random string (e.g., using `openssl rand -base64 32`) and enter it here. This is critical for session security.
*   `DATABASE_URL`: Defaults to `file:/app/db/prod.db`. The database will be stored in the `db` directory within the project folder (thanks to volume mapping).

### Step 3: Run

Start the application using Docker Compose:

```bash
docker-compose up -d --build
```

This command will:
1.  Build the Docker image.
2.  Start the container in the background.
3.  Create the database in the `./db` folder.

The application should be available at `http://<Your-NAS-IP>:3000`.

---

## Method 2: Manual Installation (Node.js)

If you have a Virtual Machine (VM) or Jail with Node.js installed (version 18 or newer), you can run the application directly.

### Step 1: Prepare Environment

Ensure you have `node` and `npm` installed.

```bash
node -v
# Should return v18.x.x or newer
```

### Step 2: Get Code and Install Dependencies

```bash
git clone https://github.com/czekanskyy/SimpleLogbook.git
cd SimpleLogbook
npm install
```

### Step 3: Configure Environment (.env)

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` (e.g., using `nano .env`) and set:
*   `DATABASE_URL="file:./prisma/prod.db"`
*   `AUTH_SECRET="<your-secret-key>"` (generate one!)

### Step 4: Build Application

```bash
npx prisma generate
npm run build
```

### Step 5: Run

Before the first run, prepare the database:

```bash
npx prisma db push
```

Then start the production server:

```bash
npm start
```

The application will start on port 3000.

### Step 6: Process Management (PM2)

To keep the application running in the background and restart on boot, it is recommended to use PM2:

```bash
npm install -g pm2
pm2 start npm --name "simplelogbook" -- start
pm2 save
pm2 startup
```

---

## Updating the Application

To update the application in the future:

**For Docker:**
```bash
git pull
docker-compose up -d --build
```

**For Node.js:**
```bash
git pull
npm install
npx prisma generate
npm run build
pm2 restart simplelogbook
```
