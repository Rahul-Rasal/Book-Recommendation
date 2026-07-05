from pathlib import Path

import pandas as pd
from sqlalchemy.orm import Session

from app.models import Book
from app.repositories.book_repository import (
    bulk_insert_books,
    count_books,
)


def import_books_if_needed(db: Session) -> None:
    """
    Imports the Kaggle dataset into MySQL only if the books table is empty.
    This ensures the import runs only once.
    """

    if count_books(db) > 0:
        print("✅ Books already exist. Skipping CSV import.")
        return

    print("📚 Importing books from CSV...")

    dataframe = _load_csv()

    dataframe = _clean_dataframe(dataframe)

    books = _convert_to_books(dataframe)

    bulk_insert_books(db, books)

    print(f"✅ Successfully imported {len(books)} books.")


def _load_csv() -> pd.DataFrame:
    """
    Loads the Kaggle CSV dataset.
    """

    csv_path = Path("data/book.csv")

    if not csv_path.exists():
        raise FileNotFoundError(
            f"Dataset not found: {csv_path.resolve()}"
        )

    return pd.read_csv(csv_path)


def _clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """
    Cleans the dataset before importing.
    """

    # Remove unnecessary index column if present
    df = df.drop(columns=["Unnamed: 0"], errors="ignore")

    # Remove duplicate books
    df = df.drop_duplicates(subset=["book_id"])

    # ---------- Text Columns ----------
    df["title"] = df["title"].fillna("").astype(str)

    df["authors"] = df["authors"].fillna("Unknown").astype(str)

    df["description"] = df["description"].fillna("").astype(str)

    df["language_code"] = df["language_code"].fillna("").astype(str)

    df["image_url"] = df["image_url"].fillna("").astype(str)

    # ---------- Numeric Columns ----------
    df["average_rating"] = pd.to_numeric(
        df["average_rating"],
        errors="coerce"
    ).fillna(0.0)

    df["original_publication_year"] = pd.to_numeric(
        df["original_publication_year"],
        errors="coerce"
    )

    return df


def _convert_to_books(df: pd.DataFrame) -> list[Book]:
    """
    Converts each DataFrame row into a SQLAlchemy Book object.
    """

    books = []

    for _, row in df.iterrows():

        year = (
            int(row["original_publication_year"])
            if pd.notna(row["original_publication_year"])
            else None
        )

        books.append(
            Book(
                book_id=int(row["book_id"]),
                title=row["title"],
                authors=row["authors"],
                description=row["description"],
                original_publication_year=year,
                language_code=row["language_code"],
                average_rating=float(row["average_rating"]),
                image_url=row["image_url"],
            )
        )

    return books