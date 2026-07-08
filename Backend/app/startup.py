import time

from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session

from app.database import Base, SessionLocal, engine
from app.ml.recommendation_model import recommendation_model
from app.repositories.book_repository import get_all_books
from app.services.import_service import import_books_if_needed


def wait_for_database(max_retries: int = 30, delay_seconds: int = 2) -> None:

    """
    Wait until the database is ready to accept connections.

    On a fresh `docker compose up`, MySQL needs time to initialize before it
    can accept real connections. Instead of failing on the first attempt, this
    retries the connection a few times, so the backend starts reliably.
    """
   
    for attempt in range(1, max_retries + 1):
        try:
            connection = engine.connect()
            connection.close()
            print("Database is ready.")
            return
        except OperationalError:
            print(
                f"Database not ready yet "
                f"(attempt {attempt}/{max_retries}), retrying in {delay_seconds}s..."
            )
            time.sleep(delay_seconds)

    raise RuntimeError("Could not connect to the database after several attempts.")


def initialize_application():
    """
    Initializes the application.
    """
    wait_for_database()

    Base.metadata.create_all(bind=engine)

    db: Session = SessionLocal()

    try:
        import_books_if_needed(db)

        books = get_all_books(db)

        recommendation_model.build(books)

    finally:
        db.close()