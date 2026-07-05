def get_recommendation_reasons(selected_book, recommended_book):
    """
    Creates simple reasons for why a book was recommended.
    """
    reasons = []

    reasons.append("The book description is similar to the selected book.")

    if selected_book.authors == recommended_book.authors:
        reasons.append("Both books are written by the same author.")

    if recommended_book.average_rating >= 4.0:
        reasons.append("This book is highly rated by readers.")

    if selected_book.original_publication_year and recommended_book.original_publication_year:
        year_difference = abs(
            selected_book.original_publication_year
            - recommended_book.original_publication_year
        )

        if year_difference <= 5:
            reasons.append("Both books were published in a similar time period.")

    return reasons