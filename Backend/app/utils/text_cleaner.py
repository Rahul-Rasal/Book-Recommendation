import re


def clean_text(text):
    """
    Cleans book description text before using it for recommendation.
    """
    if text is None:
        return ""

    text = text.lower()
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text)

    return text.strip()