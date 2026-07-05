import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 2,
        backgroundColor: "#F8FAFC",
        borderTop: "1px solid #E5E7EB",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "#64748B",
            fontWeight: 500,
          }}
        >
          © 2026 Book Recommender · Helping readers discover their next great read
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;