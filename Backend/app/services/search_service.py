from app.constants.settings import (
    DEFAULT_BOOK_LIST_LIMIT,
    MAX_SEARCH_RESULTS,
)
from app.ml.recommendation_model import recommendation_model


def format_book(book):
    """
    Converts a Book object into a dictionary.
    """
    return {
        "book_id": book.book_id,
        "title": book.title,
        "authors": book.authors,
        "original_publication_year": book.original_publication_year,
        "language_code": book.language_code,
        "average_rating": book.average_rating,
        "image_url": book.image_url,
    }


def search_books(query, limit=MAX_SEARCH_RESULTS):
    """
    Searches books by title or author.
    """
    books = recommendation_model.get_all_books()

    query = query.lower().strip()

    results = []

    for book in books:
        title = book.title.lower()
        authors = book.authors.lower()

        if query in title or query in authors:
            results.append(format_book(book))

        if len(results) == limit:
            break

    return results


def get_books(limit=DEFAULT_BOOK_LIST_LIMIT):
    """
    Returns a limited list of books.
    """
    books = recommendation_model.get_all_books()

    results = []
    count = 0

    for book in books:
        results.append(format_book(book))

        count = count + 1

        if count == limit:
            break

    return results