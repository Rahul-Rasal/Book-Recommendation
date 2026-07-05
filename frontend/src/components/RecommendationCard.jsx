import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function RecommendationCard({ item }) {
  const book = item.book;
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Card
        elevation={2}
        sx={{
          height: "100%",
          minHeight: 390,
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid #E5E7EB",
          transition: "0.2s",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: 5,
          },
        }}
      >
        <Box
          sx={{
            height: 145,
            backgroundColor: "#EEF2F7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 1.5,
          }}
        >
          {book.image_url ? (
            <CardMedia
              component="img"
              image={book.image_url}
              alt={book.title}
              sx={{
                maxHeight: "125px",
                maxWidth: "90px",
                objectFit: "contain",
                borderRadius: 1,
                boxShadow: 2,
                backgroundColor: "white",
              }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              No Cover
            </Typography>
          )}
        </Box>

        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              lineHeight: 1.25,
              mb: 0.8,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {book.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {book.authors}
          </Typography>

          <Chip
            size="small"
            label={`Rating: ${book.average_rating}`}
            sx={{
              mb: 1.5,
              backgroundColor: "#E0ECFF",
              color: "#1E3A5F",
              fontWeight: 600,
            }}
          />

          {book.description && (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 0.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontSize: "0.82rem",
                }}
              >
                {book.description}
              </Typography>

              <Button
                size="small"
                onClick={handleOpen}
                sx={{
                  p: 0,
                  mb: 1.3,
                  minWidth: "auto",
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#2563EB",
                }}
              >
                Read more
              </Button>
            </>
          )}

          <Box
            sx={{
              p: 1.2,
              backgroundColor: "#F8FAFC",
              borderRadius: 2,
              border: "1px solid #E5E7EB",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                mb: 0.7,
                color: "#1E3A5F",
              }}
            >
              Why recommended?
            </Typography>

            {item.reasons.map((reason, index) => (
              <Typography
                key={index}
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.78rem",
                  lineHeight: 1.35,
                  mb: 0.5,
                }}
              >
                • {reason}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700, color: "#1E3A5F" }}>
          {book.title}
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {book.image_url && (
              <CardMedia
                component="img"
                image={book.image_url}
                alt={book.title}
                sx={{
                  width: 90,
                  height: 130,
                  objectFit: "contain",
                  borderRadius: 1,
                  backgroundColor: "#EEF2F7",
                }}
              />
            )}

            <Box>
              <Typography color="text.secondary">
                {book.authors}
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Rating: {book.average_rating}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {book.description}
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#1E3A5F", mb: 1 }}
            >
              Why recommended?
            </Typography>

            {item.reasons.map((reason, index) => (
              <Typography
                key={index}
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.7 }}
              >
                • {reason}
              </Typography>
            ))}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RecommendationCard;