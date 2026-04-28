import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShopSection } from "./ShopPage";

const runningLabel =
  "At Shield House, we craft premium custom award shields that make every achievement unforgettable.We deliver unique, high-quality designs for institutions, corporate events, and industries that value excellence.";

const featureCards = [
  { title: "Quality Materials", text: "Reliable shelling components with verified durability." },
  { title: "Fast Delivery", text: "Timely dispatch and tracked shipping for every order." },
  { title: "Expert Support", text: "Technical guidance for product selection and setup." },
];

export default function HomePage() {
  const [counterTargets] = useState(() => [
    {
      label: "Custom Shields Crafted",
      value: Math.floor(Math.random() * 250 + 850),
    },
    {
      label: "Happy Clients Served",
      value: Math.floor(Math.random() * 90 + 210),
    },
    {
      label: "Design Ideas Delivered",
      value: Math.floor(Math.random() * 180 + 420),
    },
  ]);
  const [animatedCounters, setAnimatedCounters] = useState(counterTargets.map(() => 0));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setAnimatedCounters((current) => {
        const next = current.map((count, index) => {
          const target = counterTargets[index].value;
          if (count >= target) {
            return target;
          }

          const step = Math.max(1, Math.ceil((target - count) / 18));
          return Math.min(count + step, target);
        });

        const isComplete = next.every((count, index) => count >= counterTargets[index].value);
        if (isComplete) {
          window.clearInterval(interval);
        }

        return next;
      });
    }, 70);

    return () => window.clearInterval(interval);
  }, [counterTargets]);

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 1,
          color: "white",
          position: "relative",
          overflow: "hidden",
          isolation: "isolate",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          minHeight: { xs: 360, md: 530 },
          boxShadow: (theme) => theme.customShadows.strong,
        }}
      >
        <Box
          component="video"
          src="/videos/shield-house.mp4"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.45) saturate(0.75)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: (theme) => theme.customGradients.heroOverlay,
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h3" sx={{ mb: 2, color: "white" }}>
            Welcome to Shield House
          </Typography>
          <Typography
            sx={{
              opacity: 0.95,
              maxWidth: 700,
              fontFamily: '"papyrus", "Brush Script MT", cursive',
              fontWeight: 500,
              fontSize: { xs: "1rem", md: "1.4rem" },
              lineHeight: 1.8,
              letterSpacing: "0.6px",
              color: "rgba(255,255,255,0.92)",
              textShadow: "0 2px 14px rgba(0,0,0,0.45)",
            }}
          >
            At Shield House, we design and manufacture premium, customized award shields that turn
            achievements into lasting memories.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
            <Button
              component={Link}
              to="/shop"
              variant="contained"
              color="primary"
              startIcon={<ShoppingBagOutlinedIcon />}
            >
              Explore Shop
            </Button>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              color="inherit"
              sx={{
                color: "white",
                borderColor: "rgba(255,253,249,0.9)",
                backgroundColor: "rgba(255,253,249,0.08)",
                "&:hover": {
                  borderColor: "rgba(255,253,249,0.98)",
                  backgroundColor: "rgba(255,253,249,0.16)",
                },
              }}
              startIcon={<MailOutlineIcon />}
            >
              Contact Team
            </Button>
          </Stack>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {featureCards.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">{item.text}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          overflow: "hidden",
          borderRadius: 1,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          background: (theme) => theme.customGradients.banner,
          py: 3,
          boxShadow: (theme) => theme.customShadows.soft,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            "@keyframes homeTicker": {
              "0%": {
                transform: "translateX(0)",
              },
              "100%": {
                transform: "translateX(-50%)",
              },
            },
            animation: "homeTicker 120s linear infinite",
          }}
        >
          {[...Array(2)].map((_, index) => (
            <Typography
              key={index}
              sx={{
                whiteSpace: "nowrap",
                px: 4,
                fontSize: { xs: "0.95rem", md: "1.2rem" },
                fontWeight: 400,
                fontFamily: "Novarese",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(20,32,43,0.82)",
              }}
            >
              {runningLabel} • {runningLabel} • {runningLabel} •
            </Typography>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 1,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          background: (theme) => theme.customGradients.highlight,
          boxShadow: (theme) => theme.customShadows.medium,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, textAlign: "center" }}>
          Trusted by teams that celebrate excellence
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: 3 }}
        >
          A quick snapshot of the scale and creativity behind our custom shield projects.
        </Typography>

        <Grid container spacing={3}>
          {counterTargets.map((item, index) => (
            <Grid key={item.label} size={{ xs: 12, sm: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  textAlign: "center",
                  background: "rgba(255,253,249,0.78)",
                }}
              >
                <CardContent sx={{ py: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {animatedCounters[index]}+
                  </Typography>
                  <Typography sx={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <ShopSection />
    </Stack>
  );
}
