import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function searchBooks(query) {
  const response = await axios.get(`${API_BASE_URL}/books/search`, {
    params: {
      q: query,
    },
  });

  return response.data;
}

export async function getRecommendations(bookId) {
  const response = await axios.get(
    `${API_BASE_URL}/recommendations/${bookId}`
  );

  return response.data;
}

export async function checkBackendHealth() {
  const response = await axios.get(`${API_BASE_URL}/health`);
  return response.data;
}