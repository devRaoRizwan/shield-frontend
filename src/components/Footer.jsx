import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        mt: "auto",
        py: 2.5,
        px: 2,
        textAlign: "center",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        background: "rgba(255,253,249,0.88)",
        backdropFilter: "blur(6px)",
        boxShadow: (theme) => theme.customShadows.soft,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Copyright@ 2026 All Rights reserved. 
      </Typography>
    </Box>
  );
}
