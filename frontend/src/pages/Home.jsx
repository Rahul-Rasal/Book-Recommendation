import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";

import SearchBox from "../components/SearchBox";
import SelectedBook from "../components/SelectedBook";
import RecommendationList from "../components/RecommendationList";

import { searchBooks, getRecommendations } from "../api/bookApi";

function Home() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearchChange(event) {
    const value = event.target.value;

    setSearchText(value);
    setSelectedBook(null);
    setRecommendations([]);
    setErrorMessage("");

    if (value.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const data = await searchBooks(value);
      setSearchResults(data.results);
    } catch (error) {
      setErrorMessage("Could not search books. Please check the backend.");
    }
  }

  function handleBookSelect(book) {
    setSelectedBook(book);
    setSearchText(book.title);
    setSearchResults([]);
    setRecommendations([]);
    setErrorMessage("");
  }

  async function handleRecommend() {
    if (selectedBook === null) {
      setErrorMessage("Please select a book first.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const data = await getRecommendations(selectedBook.book_id);
      setRecommendations(data.recommendations);
    } catch (error) {
      setErrorMessage("Could not get recommendations.");
    }

    setLoading(false);
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5, mb: 6 }}>
        <Paper
  elevation={0}
  sx={{
    p: 5,
    borderRadius: 4,
    textAlign: "center",
    background: "linear-gradient(135deg, #1E3A5F, #2563EB)",
    color: "white",
  }}
>
  <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
    Book Recommendation System
  </Typography>

  <Typography variant="body1" sx={{ opacity: 0.9 }}>
    Search for a book and get similar recommendations.
  </Typography>
</Paper>

        <SearchBox
          searchText={searchText}
          searchResults={searchResults}
          onSearchChange={handleSearchChange}
          onBookSelect={handleBookSelect}
        />

        {selectedBook && (
          <SelectedBook
            book={selectedBook}
            onRecommend={handleRecommend}
          />
        )}

        {loading && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>
              Loading recommendations...
            </Typography>
          </Box>
        )}

        {errorMessage && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <RecommendationList recommendations={recommendations} />
      </Box>
    </Container>
  );
}

export default Home;