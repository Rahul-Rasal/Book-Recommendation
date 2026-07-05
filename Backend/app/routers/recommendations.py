from fastapi import APIRouter, HTTPException

from app.services.recommendation_service import get_recommendations_for_book

router = APIRouter()


@router.get("/{book_id}")
def recommend_books(book_id: int):
    """
    Returns recommended books for a selected book.
    """
    result = get_recommendations_for_book(book_id)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    return result