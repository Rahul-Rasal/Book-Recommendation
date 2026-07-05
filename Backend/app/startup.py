from sqlalchemy.orm import Session

from app.database import Base, SessionLocal, engine
from app.ml.recommendation_model import recommendation_model
from app.repositories.book_repository import get_all_books
from app.services.import_service import import_books_if_needed


def initialize_application():
    """
    Initializes the application.
    """
    Base.metadata.create_all(bind=engine)

    db: Session = SessionLocal()

    try:
        import_books_if_needed(db)

        books = get_all_books(db)

        recommendation_model.build(books)

    finally:
        db.close()