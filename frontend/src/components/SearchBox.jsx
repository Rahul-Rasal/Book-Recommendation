import {
  Box,
  TextField,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

function SearchBox({ searchText, searchResults, onSearchChange, onBookSelect }) {
  return (
    <Box sx={{ mt: 4, position: "relative" }}>
      <TextField
        fullWidth
        label="Search book by title or author"
        variant="outlined"
        value={searchText}
        onChange={onSearchChange}
      />

      {searchResults.length > 0 && (
        <Paper sx={{ mt: 1, maxHeight: 300, overflow: "auto" }}>
          <List>
            {searchResults.map((book) => (
              <ListItemButton
                key={book.book_id}
                onClick={() => onBookSelect(book)}
              >
                <ListItemText
                  primary={book.title}
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {book.authors}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default SearchBox;