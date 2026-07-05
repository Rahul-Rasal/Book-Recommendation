from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import books, recommendations
from app.startup import initialize_application


@asynccontextmanager
async def lifespan(app: FastAPI):
    initialize_application()
    yield


app = FastAPI(
    title="Book Recommendation System",
    description="Content-based Book Recommendation API using TF-IDF",
    version="1.0.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "Backend is running successfully"
    }


app.include_router(
    books.router,
    prefix="/books",
    tags=["Books"]
)


app.include_router(
    recommendations.router,
    prefix="/recommendations",
    tags=["Recommendations"]
)