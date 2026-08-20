import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Grid, IconButton, Link, Paper, Stack, Typography } from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { buildWhatsappLink } from "../lib/contact";
import { useSeo, useJsonLd } from "../lib/seo";
import CityShowcase from "../components/CityShowcase";

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
  {
    question: "How much does a custom shield cost?",
    answer:
      "The price of a custom shield depends on its size, the materials and finish you choose, and how many pieces you need. Because every order is made to specification, we prefer to quote accurately rather than advertise a figure that may not match your requirement. Send us the design you like along with your quantity and we will come back to you with a firm price.",
  },
  {
    question: "Can you print our logo and text on the shield?",
    answer:
      "Yes. Every shield we make is printed to order with your logo, wording, recipient name and event details. Send us your logo file and the exact text over WhatsApp and we will share a design preview for your approval before production begins.",
  },
  {
    question: "What sizes and materials do you offer?",
    answer:
      "Our shields range from 5x8 inches up to 10x10 inches. Standard construction is premium MDF with a deco polish matte finish, combined with glass or imported silver sheet printing depending on the design, and most orders are supplied in a premium velvet presentation box. We currently offer 30 designs across wooden awards, wooden and glass awards, V-cut and side-cut shields, oval and flower shields, and desk and office name plates.",
  },
  {
    question: "How long will my order take?",
    answer:
      "Turnaround depends on the quantity ordered and the finish involved, since each shield is printed and assembled in house. When we confirm your order we also confirm a completion date, so you know exactly where you stand. If you are working towards a ceremony or event, tell us the date up front and we will let you know honestly whether we can meet it.",
  },
  {
    question: "Do you give discounts on bulk orders?",
    answer:
      "Bulk and institutional orders are quoted separately from single pieces, and the per-shield price improves as quantity increases. We regularly supply schools, universities, corporate events and government departments, so share your quantity and we will prepare a tiered quote for you.",
  },
  {
    question: "Can you deliver outside Multan?",
    answer:
      "Yes. Our workshop is in Multan Cantt and we courier completed orders anywhere in Pakistan, including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Peshawar and Quetta. You are also welcome to collect your order from our shop on Lal Masjid Road, Sardar Bazar, Monday to Saturday between 9:00 AM and 7:00 PM.",
  },
];

export default function ContactPage() {
  useSeo({
    title: "Contact Us | Custom Shields in Multan",
    description:
      "Order custom award shields from Shield House, Lal Masjid Road, Sardar Bazar, Multan Cantt. Call +92 302 7036363 or message us on WhatsApp.",
    path: "/contact",
  });

  useJsonLd("faq-schema", {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: commonQuestions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  });

  const [expanded, setExpanded] = useState(false);

  function ask(question) {
    window.open(buildWhatsappLink(question), "_blank", "noreferrer");
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
          Contact Us
        </Typography>
        <Typography color="text.secondary">
          Answers to the questions we are asked most, plus a direct line to us on WhatsApp
          for anything else.
        </Typography>
      </Box>

      <Grid container spacing={3} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              {contactDetails.map((item) => (
                <Grid key={item.label} size={{ xs: 12, sm: 6 }}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        py: 3.5,
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
          <Paper elevation={2} sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Common Questions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tap a question to read the answer, or message us for anything else.
                </Typography>
              </Box>

              <Box>
                {commonQuestions.map(({ question, answer }) => (
                  <Accordion
                    key={question}
                    expanded={expanded === question}
                    onChange={(event, isExpanded) => setExpanded(isExpanded ? question : false)}
                    square
                    disableGutters
                    elevation={0}
                    sx={{
                      mb: 1.2,
                      // `square` opts out of MUI's own radius rules, which zero the
                      // corners on every item except the first and last.
                      borderRadius: 2,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      // An Accordion is a Paper, so the theme paints a near-white
                      // background on it. Every inner layer is made transparent
                      // so that layer can never flash through mid-animation.
                      background: "#fdfaf3",
                      backgroundImage: "none",
                      boxShadow: "none",
                      transition: "background-color 0.22s ease, border-color 0.22s ease",
                      "&::before": { display: "none" },
                      "& .MuiAccordionSummary-root, & .MuiAccordionDetails-root, & .MuiCollapse-root, & .MuiAccordion-region":
                        { background: "transparent" },
                      // The summary is a focusable div, so the browser draws its own
                      // ring on it. Suppressed here along with MUI's focus wash.
                      "& .MuiAccordionSummary-root": {
                        borderRadius: 2,
                        "&.Mui-focusVisible": { background: "transparent" },
                        "&:focus, &:focus-visible": { outline: "none" },
                      },
                      "&:hover": {
                        borderColor: "rgba(184,138,27,0.34)",
                      },
                      "&.Mui-expanded": {
                        background: "#faf3e2",
                        borderColor: "rgba(184,138,27,0.34)",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon fontSize="small" sx={{ color: "secondary.main" }} />
                      }
                      sx={{ px: 1.75, minHeight: 0, "& .MuiAccordionSummary-content": { my: 1.4 } }}
                    >
                      <Typography variant="body2" component="h3" sx={{ fontWeight: 500 }}>
                        {question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 1.75, pt: 0, pb: 1.75 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        {answer}
                      </Typography>
                      <Button
                        size="small"
                        variant="text"
                        startIcon={<WhatsAppIcon fontSize="small" />}
                        onClick={() => ask(question)}
                        sx={{ px: 0 }}
                      >
                        Ask us on WhatsApp
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>

            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Box
        component="section"
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 1,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          background: (theme) => theme.customGradients.highlight,
          boxShadow: (theme) => theme.customShadows.medium,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 1, textAlign: "center" }}>
          Custom shields in Multan, delivered across Pakistan
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ textAlign: "center", maxWidth: 760, mx: "auto", mb: 3 }}
        >
          Our workshop is on Lal Masjid Road, Sardar Bazar, Multan Cantt, where every shield is
          made in house. Visit us Monday to Saturday, 9:00 AM to 7:00 PM, or send your logo and
          wording over WhatsApp and we will courier the finished order anywhere in Pakistan.
        </Typography>

        <CityShowcase />
      </Box>
    </Stack>
  );
}
