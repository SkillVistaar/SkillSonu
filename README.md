# Full-Stack Platform Scaffold

A full-stack web platform template featuring:
- **Frontend**: React (JavaScript), Vite, and Tailwind CSS with a clean blank landing page.
- **Backend**: Python FastAPI with asynchronous endpoints, CORS, and health checks.
- **Database**: PostgreSQL with SQLAlchemy ORM and connection pooling.
- **Deployment**: Render Blueprint (`render.yaml`) for 1-click deployment of the Database, Backend, and Frontend.

---

## Project Structure

```
├── frontend/                     # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── App.jsx               # Blank landing page with live system status
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Tailwind directives
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/                      # Python FastAPI API
│   ├── app/
│   │   ├── main.py               # FastAPI application & endpoints
│   │   ├── config.py             # App settings & env parser
│   │   ├── database.py           # PostgreSQL engine & session
│   │   └── models.py             # SQLAlchemy models
│   ├── requirements.txt
│   └── .env.example
├── render.yaml                   # Render Blueprint (Infrastructure-as-Code)
└── README.md
```

---

## Getting Started Locally

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` to point to your local PostgreSQL instance if you have one running.*

5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   - API will be accessible at: `http://localhost:8000`
   - Interactive Swagger API docs: `http://localhost:8000/docs`
   - Health check: `http://localhost:8000/api/health`

---

### 2. Frontend Setup

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser. The blank landing page will load and query the backend health check.

---

## Deploying to Render

This project is pre-configured with a Render Blueprint (`render.yaml`) that provisions:
1. **sv-db**: Managed PostgreSQL instance (free plan).
2. **sv-backend**: Python web service with automatic database URL binding.
3. **sv-frontend**: Static site with automated Vite build and SPA routing.

### Step-by-Step Deployment:

1. **Push this repository to GitHub or GitLab**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of full-stack platform"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Render**:
   - Log into [Render.com](https://dashboard.render.com/).
   - Click **New +** > **Blueprint**.
   - Connect your GitHub repository.
   - Render will detect `render.yaml` and display the blueprint resources (Database, Backend, Frontend).
   - Click **Apply**.

Render will automatically:
- Provision the PostgreSQL database.
- Build and start the Python backend service, injecting the database connection.
- Build the React static frontend, pointing its API requests to the backend service.
