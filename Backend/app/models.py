from sqlalchemy import Column, Integer, String, Float, Text
from app.database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)

    book_id = Column(Integer, unique=True, nullable=False, index=True)

    title = Column(String(500), index=True)

    authors = Column(String(255))

    description = Column(Text)

    original_publication_year = Column(Integer)

    language_code = Column(String(10))

    average_rating = Column(Float)

    image_url = Column(String(1000))