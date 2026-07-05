from sqlalchemy.orm import Session

from app.models import Book


def count_books(db: Session) -> int:
    """
    Returns the total number of books in the database.
    """
    return db.query(Book).count()


def bulk_insert_books(db: Session, books: list[Book]) -> None:
    """
    Inserts multiple books into the database.
    """

    db.bulk_save_objects(books)
    db.commit()


def get_all_books(db: Session) -> list[Book]:
    """
    Returns all books from the database.
    """

    return db.query(Book).all()