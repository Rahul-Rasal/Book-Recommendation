import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

function About() {
  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(135deg, #1E3A5F, #2563EB)",
          color: "white",
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              textAlign: "center",
            }}
          >
            Discover Your Next Great Read
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              textAlign: "center",
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Book Recommender helps readers find books that match their taste,
            starting from the books they already enjoy.
          </Typography>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#1E3A5F",
                textTransform: "none",
                fontWeight: 700,
                px: 4,
                py: 1.2,
                "&:hover": {
                  backgroundColor: "#F3F4F6",
                },
              }}
            >
              Start Exploring
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mt: -4, mb: 6 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #E5E7EB",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1E3A5F", mb: 1 }}
              >
                Simple Discovery
              </Typography>

              <Typography color="text.secondary">
                Search for a book you like and quickly explore similar titles
                without scrolling through endless random suggestions.
              </Typography>
            </Paper>

            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #E5E7EB",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1E3A5F", mb: 1 }}
              >
                Meaningful Suggestions
              </Typography>

              <Typography color="text.secondary">
                Each recommendation is selected based on the book you choose,
                helping you find titles that feel relevant to your interests.
              </Typography>
            </Paper>

            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #E5E7EB",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1E3A5F", mb: 1 }}
              >
                Clear Reasons
              </Typography>

              <Typography color="text.secondary">
                Recommendations include a short explanation, so users can
                understand why a book was suggested.
              </Typography>
            </Paper>
          </Box>
        </Box>

        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            border: "1px solid #E5E7EB",
            mb: 6,
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "#1E3A5F", mb: 2 }}
              >
                About Book Recommender
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                Book Recommender is built for readers who want a better way to
                discover books. Instead of depending on generic lists or random
                suggestions, users can begin with a book they already know and
                find similar titles that match their reading taste.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#1E3A5F", mb: 1 }}
              >
                Our Purpose
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                Finding the next right book can be difficult. Many readers know
                what they enjoyed before, but they are unsure what to read next.
                Book Recommender makes that decision easier by turning one
                familiar book into a starting point for discovering many new
                options.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#1E3A5F", mb: 1 }}
              >
                What Makes It Useful
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                The platform keeps the experience clean and focused. Users can
                search, select, and receive recommendations in a few simple
                steps. Each suggested book includes useful details such as the
                cover image, author, rating, and a short reason for the
                recommendation.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default About;