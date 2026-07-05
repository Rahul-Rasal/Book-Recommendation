from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.constants.settings import (
    MAX_TFIDF_FEATURES,
    MIN_SIMILARITY_SCORE,
    TOP_RECOMMENDATIONS,
)
from app.utils.text_cleaner import clean_text


class RecommendationModel:
    """
    Handles the book recommendation logic.
    """

    def __init__(self):
        self.books_list = []
        self.books_by_id = {}
        self.book_id_to_index = {}

        self.tfidf_vectorizer = None
        self.tfidf_matrix = None
        self.similarity_matrix = None

        self.is_ready = False

    def build(self, books):
        """
        Builds the TF-IDF matrix and similarity matrix.
        This runs once when the application starts.
        """
        if len(books) == 0:
            raise ValueError("No books found to build recommendation model.")

        print("🧠 Building recommendation model...")

        self.books_list = books
        self.books_by_id = {}
        self.book_id_to_index = {}

        descriptions = []
        index = 0

        for book in books:
            self.books_by_id[book.book_id] = book
            self.book_id_to_index[book.book_id] = index

            cleaned_description = clean_text(book.description)
            descriptions.append(cleaned_description)

            index = index + 1

        self.tfidf_vectorizer = TfidfVectorizer(
            stop_words="english",
            max_features=MAX_TFIDF_FEATURES
        )

        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(descriptions)

        self.similarity_matrix = cosine_similarity(self.tfidf_matrix)

        self.is_ready = True

        print("✅ Recommendation model is ready.")

    def get_all_books(self):
        """
        Returns all books loaded in memory.
        """
        return self.books_list

    def get_book_by_id(self, book_id):
        """
        Returns a single book by book_id.
        """
        if book_id in self.books_by_id:
            return self.books_by_id[book_id]

        return None

    def get_similar_books(self, book_id, top_n=TOP_RECOMMENDATIONS):
        """
        Returns similar books for the selected book.
        """
        if self.is_ready == False:
            raise RuntimeError("Recommendation model is not ready.")

        if book_id not in self.book_id_to_index:
            raise ValueError("Book not found.")

        selected_book_index = self.book_id_to_index[book_id]

        similarity_scores = self.similarity_matrix[selected_book_index]

        scored_books = []
        index = 0

        for score in similarity_scores:
            if index != selected_book_index and score >= MIN_SIMILARITY_SCORE:
                scored_books.append(
                    {
                        "index": index,
                        "score": score
                    }
                )

            index = index + 1

        scored_books.sort(
            key=lambda item: item["score"],
            reverse=True
        )

        top_scored_books = scored_books[:top_n]

        recommended_books = []

        for scored_book in top_scored_books:
            book_index = scored_book["index"]
            book = self.books_list[book_index]

            recommended_books.append(
                {
                    "book": book,
                    "similarity_score": float(scored_book["score"])
                }
            )

        return recommended_books


recommendation_model = RecommendationModel()