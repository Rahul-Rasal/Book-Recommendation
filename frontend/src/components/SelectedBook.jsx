import {
  Box,
  Typography,
  Button,
  Paper,
  CardMedia,
  Stack,
  Chip,
} from "@mui/material";

function SelectedBook({ book, onRecommend }) {
  return (
    <Paper
      elevation={3}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Selected Book
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
        {book.image_url && (
          <CardMedia
            component="img"
            image={book.image_url}
            alt={book.title}
            sx={{
              width: 140,
              height: 210,
              objectFit: "contain",
              backgroundColor: "#EEF2F7",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        )}

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">
            {book.title}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {book.authors}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
            <Chip label={`Rating: ${book.average_rating}`} />
            {book.original_publication_year && (
              <Chip label={`Year: ${book.original_publication_year}`} />
            )}
            {book.language_code && (
              <Chip label={`Language: ${book.language_code}`} />
            )}
          </Stack>

          <Button
  variant="contained"
  size="large"
  onClick={onRecommend}
  sx={{
    mt: 3,
    backgroundColor: "#2563EB",
    textTransform: "none",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#1D4ED8",
    },
  }}
>
  Recommend Similar Books
</Button>
        </Box>
      </Stack>
    </Paper>
  );
}

export default SelectedBook;