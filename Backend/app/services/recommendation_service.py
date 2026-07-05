from app.ml.recommendation_model import recommendation_model
from app.services.explanation_service import get_recommendation_reasons


def format_book(book):
    """
    Converts a Book object into a dictionary.
    """
    return {
        "book_id": book.book_id,
        "title": book.title,
        "authors": book.authors,
        "description": book.description,
        "original_publication_year": book.original_publication_year,
        "language_code": book.language_code,
        "average_rating": book.average_rating,
        "image_url": book.image_url,
    }


def get_recommendations_for_book(book_id):
    """
    Returns recommended books for the selected book.
    """
    selected_book = recommendation_model.get_book_by_id(book_id)

    if selected_book is None:
        return None

    similar_books = recommendation_model.get_similar_books(book_id)

    recommendations = []

    for item in similar_books:
        recommended_book = item["book"]
        similarity_score = item["similarity_score"]

        reasons = get_recommendation_reasons(
            selected_book,
            recommended_book
        )

        recommendations.append(
            {
                "book": format_book(recommended_book),
                "similarity_score": round(similarity_score, 4),
                "reasons": reasons,
            }
        )

    return {
        "selected_book": format_book(selected_book),
        "recommendations": recommendations,
    }