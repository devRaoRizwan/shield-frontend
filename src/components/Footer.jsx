import { Box, Button, Container, Grid, IconButton, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import { buildWhatsappLink, whatsappNumber } from "../lib/contact";

const address = "Lal Masjid Road, Near Police Station Sardar Bazar, Multan Cantt, Multan, Pakistan";
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

// Every link below points at a route that exists, so the footer never sends
// visitors or crawlers to the catch-all redirect.
const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "Shop All Shields", to: "/shop" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const popularShields = [
  { label: "Wooden Shield", to: "/shop/10" },
  { label: "V-Cut Wooden Shield", to: "/shop/11" },
  { label: "China Cut Shield", to: "/shop/15" },
  { label: "Office Table Plate", to: "/shop/20" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/100071909044913/", icon: <FacebookOutlinedIcon /> },
  { label: "Instagram", href: "https://www.instagram.com/shieldhouse_01/", icon: <InstagramIcon /> },
  { label: "TikTok", href: "https://www.tiktok.com/discover/shieldhouse_", icon: <TikTokIcon /> },
];

function TikTokIcon() {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{ width: 22, height: 22, display: "block", fill: "currentColor" }}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-1.92V16.3a5.3 5.3 0 1 1-5.3-5.3c.35 0 .69.03 1.02.1v2.68a2.68 2.68 0 1 0 1.66 2.47V2h2.62a4.85 4.85 0 0 0 3.77 2.07z" />
    </Box>
  );
}

const columnHeading = {
  variant: "overline",
  sx: { color: "#7e5b10", letterSpacing: "0.14em", fontWeight: 700 },
};

const footerLinkSx = {
  color: "text.secondary",
  textDecoration: "none",
  fontSize: 14,
  transition: "color 0.2s ease",
  "&:hover": { color: "primary.main" },
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        mt: "auto",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        background: (theme) => theme.customGradients.surface,
        backdropFilter: "blur(6px)",
      }}
    >
      <Container maxWidth="xl" sx={{ pt: { xs: 3, md: 3 }, pb: 2 }}>
        <Box
          sx={{
            p: { xs: 2, md: 2.5 },
            mb: { xs: 2.5, md: 3 },
            borderRadius: 2,
            background: "linear-gradient(135deg, #d8b454 0%, #b88a1b 55%, #8f6812 100%)",
            boxShadow: (theme) => theme.customShadows.medium,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h6" sx={{ color: "#24190a", fontWeight: 700 }}>
                Planning an award ceremony?
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(36,25,10,0.82)" }}>
                Send us your logo and wording, and we will share a design preview before production.
              </Typography>
            </Box>
            <Button
              component={Link}
              href={buildWhatsappLink("Hello, I would like to discuss a custom shield order.")}
              target="_blank"
              rel="noreferrer"
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<WhatsAppIcon />}
              sx={{ flexShrink: 0 }}
            >
              Message Us
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={{ xs: 2.5, md: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography {...columnHeading}>Explore</Typography>
            <Stack spacing={0.75} sx={{ mt: 1.25 }}>
              {exploreLinks.map((item) => (
                <Link key={item.to} component={RouterLink} to={item.to} sx={footerLinkSx}>
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography {...columnHeading}>Popular Shields</Typography>
            <Stack spacing={0.75} sx={{ mt: 1.25 }}>
              {popularShields.map((item) => (
                <Link key={item.to} component={RouterLink} to={item.to} sx={footerLinkSx}>
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography {...columnHeading}>Get In Touch</Typography>
            <Stack spacing={1} sx={{ mt: 1.25 }}>
              <Link href="tel:+923027036363" sx={footerLinkSx}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneOutlinedIcon sx={{ fontSize: 17 }} />
                  <span>+92 302 7036363</span>
                </Stack>
              </Link>
              <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" sx={footerLinkSx}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <WhatsAppIcon sx={{ fontSize: 17 }} />
                  <span>Chat on WhatsApp</span>
                </Stack>
              </Link>
              <Link href="mailto:nabeelrao0306@gmail.com" sx={footerLinkSx}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <MailOutlineIcon sx={{ fontSize: 17 }} />
                  <span>nabeelrao0306@gmail.com</span>
                </Stack>
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography {...columnHeading}>Visit The Workshop</Typography>
            <Stack spacing={1} sx={{ mt: 1.25 }}>
              <Link href={mapsLink} target="_blank" rel="noreferrer" sx={footerLinkSx}>
                <Stack direction="row" spacing={1}>
                  <LocationOnOutlinedIcon sx={{ fontSize: 17, mt: "2px" }} />
                  <span>{address}</span>
                </Stack>
              </Link>
              <Stack direction="row" spacing={1} sx={{ color: "text.secondary", fontSize: 14 }}>
                <AccessTimeOutlinedIcon sx={{ fontSize: 17, mt: "2px" }} />
                <span>Mon – Sat, 9:00 AM – 7:00 PM</span>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="xl" sx={{ py: 1 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" color="text.secondary">
              © 2026 Shield House. All rights reserved.
            </Typography>

            <Stack direction="row" spacing={0.5}>
              {socialLinks.map((item) => (
                <IconButton
                  key={item.label}
                  component={Link}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  size="small"
                  sx={{
                    width: 34,
                    height: 34,
                    transition: "all 0.2s ease",
                    "&:hover": { bgcolor: "rgba(251,246,232,0.96)" },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
