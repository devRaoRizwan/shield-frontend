import { useState } from "react";
import { Alert, Box, Button, Card, CardContent, Grid, IconButton, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { createInquiry } from "../lib/api";

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

export default function ContactPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      await createInquiry(form);
      setSuccess("Your inquiry has been sent to the admin.");
      setForm({
        full_name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Unable to send your inquiry right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
          Contact Us
        </Typography>
        <Typography color="text.secondary">
          Send your inquiry and we will respond with technical and product guidance.
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
          <Paper elevation={2} sx={{ p: { xs: 2.5, md: 4 }, height: "100%" }}>
            <Stack spacing={2} component="form" onSubmit={handleSubmit}>
              {success ? <Alert severity="success">{success}</Alert> : null}
              {error ? <Alert severity="error">{error}</Alert> : null}
              <TextField
                label="Full Name"
                fullWidth
                required
                value={form.full_name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, full_name: event.target.value }))
                }
              />
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
              />
              <TextField
                label="Subject"
                fullWidth
                required
                value={form.subject}
                onChange={(event) =>
                  setForm((current) => ({ ...current, subject: event.target.value }))
                }
              />
              <TextField
                label="Message"
                multiline
                rows={5}
                fullWidth
                required
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
              />
              <Button type="submit" variant="contained" size="large" sx={{ alignSelf: "flex-start" }} disabled={submitting}>
                {submitting ? "Sending..." : "Send Query"}
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
