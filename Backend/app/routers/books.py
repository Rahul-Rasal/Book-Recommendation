from fastapi import APIRouter, Query

from app.services.search_service import get_books, search_books

router = APIRouter()


@router.get("/")
def list_books():
    """
    Returns a small list of books.
    """
    return {
        "books": get_books()
    }


@router.get("/search")
def search_books_route(q: str = Query(..., min_length=1)):
    """
    Searches books by title or author.
    """
    results = search_books(q)

    return {
        "query": q,
        "results": results
    }