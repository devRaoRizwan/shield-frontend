import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Contact", path: "/contact" },
  { label: "About", path: "/about" },
];

export default function MainLayout({ children }) {
  const { pathname } = useLocation();
  const [logoError, setLogoError] = useState(false);
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        color: "text.primary",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: (theme) => theme.customGradients.page,
          pointerEvents: "none",
        },
      }}
    >
      {isAdminRoute ? null : (
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            background: "none",
            backgroundImage: "none",
            border: "none",
            boxShadow: "none",
            pt: 2.2,
          }}
        >
          <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
            <Toolbar
              disableGutters
              sx={{
                px: { xs: 1, sm: 1 },
                gap: { xs: 0.5, sm: 1 },
                borderRadius: "999px",
                bgcolor: "rgba(255,253,249,0.88)",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                boxShadow: (theme) => theme.customShadows.medium,
                backdropFilter: "blur(6px)",
                width: { xs: "100%", sm: "92%", md: "80%" },
                maxWidth: "100%",
                overflow: "hidden",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: { xs: 1, sm: 3 },
                  mr: { xs: 1, sm: 3, md: 8 },
                  flexShrink: 0,
                }}
              >
                {!logoError ? (
                  <Box
                    component="img"
                    src="/shield-house-logo.png"
                    alt="Shield House"
                    onError={() => setLogoError(true)}
                    sx={{
                      width: { xs: 60, sm: 60 },
                      height: { xs: 60, sm: 60 },
                      borderRadius: 0,
                      objectFit: "contain",
                      display: "block",
                      p: 0.01,
                      filter: "contrast(1.15) brightness(1.08) saturate(2.05)",
                      transform: { xs: "scale(2.28)", sm: "scale(2.5)" },
                      transformOrigin: "center",
                      mt: "6px",
                    }}
                  />
                ) : (
                  <Typography variant="body2" component="div" sx={{ color: "text.primary", px: 1 }}>
                    SH
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  ml: "auto",
                  minWidth: 0,
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {navItems.map((item) => {
                  const isActive = pathname === item.path;

                  return (
                    <Button
                      key={item.path}
                      component={Link}
                      to={item.path}
                      variant="text"
                      sx={{
                        px: { xs: 0.4, sm: 1.2 },
                        minWidth: { xs: 54, sm: 74 },
                        borderRadius: "1200px",
                        fontWeight: 600,
                        fontSize: { xs: "0.7rem", sm: "1rem" },
                        letterSpacing: "0.6px",
                        textTransform: "uppercase",
                        fontFamily: "'Poppins', sans-serif",
                        lineHeight: 1.2,
                        color: isActive ? "secondary.main" : "text.secondary",
                        bgcolor: isActive ? "rgba(184,138,27,0.14)" : "transparent",
                        border: isActive
                          ? (theme) => `1px solid ${theme.palette.divider}`
                          : "1px solid transparent",
                        whiteSpace: "nowrap",
                        transition: "all 0.25s ease",
                        "&:hover": {
                          bgcolor: isActive
                            ? "rgba(184,138,27,0.2)"
                            : "rgba(184,138,27,0.08)",
                          color: "secondary.main",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}

      <Container
        maxWidth={isAdminRoute ? "xl" : "lg"}
        sx={{ py: isAdminRoute ? 3 : 5, flex: 1, position: "relative", zIndex: 1 }}
      >
        {children}
      </Container>

      {isAdminRoute ? null : <Footer />}
    </Box>
  );
}
