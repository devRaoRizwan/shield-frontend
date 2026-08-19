import { useState } from "react";
import { Box, Button, ButtonBase, Card, CardContent, Divider, Grid, IconButton, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { buildWhatsappLink } from "../lib/contact";

function TikTokIcon() {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{ width: 24, height: 24, display: "block", fill: "currentColor", color: "primary.main" }}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-1.92V16.3a5.3 5.3 0 1 1-5.3-5.3c.35 0 .69.03 1.02.1v2.68a2.68 2.68 0 1 0 1.66 2.47V2h2.62a4.85 4.85 0 0 0 3.77 2.07z" />
    </Box>
  );
}

const contactDetails = [
  {
    label: "Phone Number",
    value: "+92 302 7036363",
    icon: <PhoneOutlinedIcon color="primary" />,
  },
  {
    label: "Email Address",
    value: "nabeelrao0306@gmail.com",
    icon: <MailOutlineIcon color="primary" />,
  },
  {
    label: "Location",
    value: "Lal Masjid Road Near Police Station Sardar Bazar Multan Cantt , Multan, Pakistan",
    icon: <LocationOnOutlinedIcon color="primary" />,
  },
  {
    label: "Working Hours",
    value: "Mon - Sat, 9:00 AM - 7:00 PM",
    icon: <AccessTimeOutlinedIcon color="primary" />,
  },
];

const socialLinks = [
  {
    label: "Facebook",
    value: "facebook.com/shieldhouse",
    href: "https://www.facebook.com/100071909044913/",
    icon: <FacebookOutlinedIcon color="primary" />,
  },
  {
    label: "Instagram",
    value: "instagram.com/shieldhouse",
    href: "https://www.instagram.com/shieldhouse_01/",
    icon: <InstagramIcon color="primary" />,
  },
  {
    label: "TikTok",
    value: "tiktok.com/shieldhouse",
    href: "https://www.tiktok.com/discover/shieldhouse_",
    icon: <TikTokIcon />,
  },
];

const commonQuestions = [
  "How much does a custom shield cost?",
  "Can you print our logo and text on the shield?",
  "What sizes and materials do you offer?",
  "How long will my order take?",
  "Do you give discounts on bulk orders?",
  "Can you deliver outside Multan?",
];

export default function ContactPage() {
  const [query, setQuery] = useState("");

  function ask(question) {
    window.open(buildWhatsappLink(question), "_blank", "noreferrer");
  }

  function handleSubmit(event) {
    event.preventDefault();
    ask(query);
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
          Contact Us
        </Typography>
        <Typography color="text.secondary">
          Pick a common question or ask your own, and we will reply on WhatsApp.
        </Typography>
      </Box>

      <Grid container spacing={3} alignItems="stretch">
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2} sx={{ height: "100%" }}>
            <Grid container spacing={2}>
              {contactDetails.map((item) => (
                <Grid key={item.label} size={{ xs: 12, sm: 6 }}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent
                      sx={{
                        height: "60%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        py: 7
                      }}
                    >
                      <Box sx={{ mb: 1.2, display: "flex", justifyContent: "center" }}>{item.icon}</Box>
                      <Typography variant="h6" sx={{ mb: 0.5 }}>
                        {item.label}
                      </Typography>
                      <Typography color="text.secondary">{item.value}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Paper elevation={2} sx={{ p: { xs: 2.5, md: 3 }, textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={1.5} justifyContent="center">
                {socialLinks.map((item) => (
                  <IconButton
                    key={item.label}
                    component={Link}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    sx={{
                      width: 52,
                      height: 52,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      bgcolor: "rgba(255,253,249,0.82)",
                      "&:hover": {
                        bgcolor: "rgba(251,246,232,0.96)",
                      },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper elevation={2} sx={{ p: { xs: 2.5, md: 3.5 }, height: "100%" }}>
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Common Questions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tap a question and it opens in WhatsApp, ready to send.
                </Typography>
              </Box>

              <Stack spacing={1.2}>
                {commonQuestions.map((question) => (
                  <ButtonBase
                    key={question}
                    onClick={() => ask(question)}
                    sx={{
                      px: 1.75,
                      py: 1.4,
                      borderRadius: 2,
                      textAlign: "left",
                      justifyContent: "space-between",
                      gap: 1,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      bgcolor: "rgba(255,253,249,0.82)",
                      transition: "all 0.22s ease",
                      "&:hover": {
                        bgcolor: "rgba(184,138,27,0.08)",
                        borderColor: "rgba(184,138,27,0.34)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {question}
                    </Typography>
                    <ChevronRightIcon fontSize="small" sx={{ color: "secondary.main", flexShrink: 0 }} />
                  </ButtonBase>
                ))}
              </Stack>

              <Divider sx={{ "&::before, &::after": { borderColor: "divider" } }}>
                <Typography variant="body2" color="text.secondary">
                  or ask your own
                </Typography>
              </Divider>

              <Stack spacing={2} component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Your Question"
                  placeholder="Tell us what you need and we will guide you."
                  multiline
                  rows={4}
                  fullWidth
                  required
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<WhatsAppIcon />}
                  disabled={!query.trim()}
                >
                  Ask on WhatsApp
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
