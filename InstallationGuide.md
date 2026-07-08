# Installation Guide Book Recommendation System

This guide explains how to install and run the Book Recommendation System. The
recommended method is Docker (plug-and-play, one command). A manual setup without
Docker is also documented for local development.

For how to *use* the application after it is running, see the
[User Manual](UserManual.md).

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Method 1 Run with Docker (Recommended)](#method-1-run-with-docker-recommended)
- [Verifying the Application Is Running](#verifying-the-application-is-running)
- [Stopping the Application](#stopping-the-application)
- [Resetting to a Fresh State](#resetting-to-a-fresh-state)
- [Method 2 Manual Setup (Without Docker)](#method-2-manual-setup-without-docker)
- [Ports Used](#ports-used)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### For the Docker method (recommended)

- **Docker Desktop** installed and running.
  - Download: https://www.docker.com/products/docker-desktop/
  - After installing, make sure Docker Desktop is open and shows that the engine is
    running before continuing.
- **Git** installed, to clone the repository.
  - Download: https://git-scm.com/downloads

No other software is required for the Docker method Python, Node.js, and MySQL all
run inside containers, so you do not need to install them on your machine.

### For the manual method (optional, development only)

- **Python 3.11**
- **Node.js 20** and npm
- A running local **MySQL 8** server

---

## Method 1 Run with Docker (Recommended)

This is the simplest way to run the entire project (frontend, backend, and database)
with a single command.

### Step 1 Clone the repository

```bash
git clone https://github.com/Rahul-Rasal/Book-Recommendation.git
```

### Step 2 Enter the project folder

```bash
cd Book-Recommendation
```

### Step 3 Build and start all services

```bash
docker compose up --build
```

This command builds the frontend and backend images and starts three containers:

- `book_mysql` — the MySQL database
- `book_backend` — the FastAPI backend
- `book_frontend` — the React frontend

> **Note:** The **first** run takes several minutes. Docker downloads the base images,
> installs all dependencies (`pip install` and `npm ci`), and MySQL initializes its
> database for the first time. This is normal. Later runs are much faster because these
> steps are cached.

### Step 4 Wait for startup to complete

On the first run, the backend waits for MySQL to be ready, creates the database
tables, imports the dataset (4,766 books) into MySQL, and builds the recommendation
model in memory. You will know it is ready when the logs show messages similar to:

```
Database is ready.
Successfully imported 4766 books.
Recommendation model is ready.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 5 Open the application

Once startup is complete, open your web browser and go to:

```
http://localhost:5173
```

---

## Verifying the Application Is Running

You can confirm each part is working:

- **Frontend:** open http://localhost:5173 — the Book Recommender home page should
  load.
- **Backend health check:** open http://localhost:8000/health — it should return:
  ```json
  { "status": "ok", "message": "Backend is running successfully" }
  ```

If both of these work, the application is installed and running correctly. See the
[User Manual](UserManual.md) for how to search and get recommendations.

---

## Stopping the Application

To stop the containers, press `Ctrl + C` in the terminal where they are running, or
run this from the project folder:

```bash
docker compose down
```

This stops and removes the containers but keeps the database data, so the next start
is quick and does not need to re-import the dataset.

---

## Resetting to a Fresh State

To stop everything **and** delete the database data (so the dataset is re-imported on
the next start from scratch):

```bash
docker compose down -v
```

The `-v` flag removes the MySQL data volume. Use this if you want a completely clean
first-run experience.

---

## Method 2 Manual Setup (Without Docker)

This method is intended for local development. It requires Python, Node.js, and a
locally running MySQL server.

### Backend

```bash
cd Backend

# Create and activate a virtual environment
python -m venv .venv

# Windows:
.venv\Scripts\activate
# macOS / Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Before running, make sure a local MySQL server is running and create a `Backend/.env`
file (you can copy `Backend/.env.example`) with your database settings:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=books_db
DB_USER=root
DB_PASSWORD=your_mysql_password
```

Then start the backend:

```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on http://localhost:5173 and connect to the backend at
http://localhost:8000.

---

## Ports Used

| Service  | URL / Port                     | Notes                                            |
|----------|--------------------------------|--------------------------------------------------|
| Frontend | http://localhost:5173          | The web application                              |
| Backend  | http://localhost:8000          | The API (health check at `/health`)              |
| Database | host port `3307` → container `3306` | MySQL; mapped to 3307 on the host to avoid conflicts with a local MySQL on 3306 |

---

## Troubleshooting

**`docker compose up` fails with "no configuration file provided"**
You are not in the correct folder. Make sure you have run `cd Book-Recommendation`
first, so you are in the folder that contains `docker-compose.yml`.

**A port is already in use (5173, 8000, or 3307)**
Another program (or an old container) is using that port. Stop the other program, or
stop old containers with `docker compose down`. You can list running containers with
`docker ps`.

**The backend logs show it is retrying to connect to the database**
This is expected on the first startup. MySQL takes time to initialize, and the backend
automatically retries until the database is ready, then continues. No action is needed.

**The first build is very slow**
This is normal on the first run (downloading images and installing dependencies).
Subsequent runs are much faster due to caching.

**Docker Desktop is not running**
The `docker compose` commands require Docker Desktop to be open and its engine running.
Start Docker Desktop and wait until it reports that it is running, then try again.

**Changes to the code are not reflected**
If you changed source files, rebuild the images with `docker compose up --build` so the
changes are included.