import { Box, Typography } from "@mui/material";

import RecommendationCard from "./RecommendationCard";

function RecommendationList({ recommendations }) {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
        Recommended Books
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          },
          gap: 2.5,
        }}
      >
        {recommendations.map((item) => (
          <RecommendationCard
            key={item.book.book_id}
            item={item}
          />
        ))}
      </Box>
    </Box>
  );
}

export default RecommendationList;