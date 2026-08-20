import { useState } from "react";
import { Box, ButtonBase, Fade, IconButton, Paper, Stack, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import { buildWhatsappLink } from "../lib/contact";

// Action-led openers rather than FAQ wording, since every tap here is someone
// who already wants to talk to us.
const quickPrompts = [
  "I would like a price for a custom shield.",
  "I need shields in bulk for an event.",
  "Do you deliver to my city?",
  "I want to send my logo for a design.",
];

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  function start(message) {
    window.open(buildWhatsappLink(message), "_blank", "noreferrer");
    setOpen(false);
  }

  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: 16, md: 24 },
        bottom: { xs: 16, md: 24 },
        zIndex: (theme) => theme.zIndex.tooltip,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 1.5,
      }}
    >
      <Fade in={open} unmountOnExit>
        <Paper
          elevation={6}
          sx={{
            width: { xs: "min(84vw, 320px)", md: 340 },
            p: 2,
            borderRadius: 3,
            background: "#fdfaf3",
            backgroundImage: "none",
          }}
        >
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1.5 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Chat with Shield House
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Mon – Sat, 9:00 AM – 7:00 PM
              </Typography>
            </Box>
            <IconButton size="small" aria-label="Close chat" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Pick a message to send us on WhatsApp, or start a blank chat.
          </Typography>

          <Stack spacing={1}>
            {quickPrompts.map((prompt) => (
              <ButtonBase
                key={prompt}
                onClick={() => start(prompt)}
                sx={{
                  px: 1.5,
                  py: 1.2,
                  borderRadius: 2,
                  textAlign: "left",
                  justifyContent: "flex-start",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(184,138,27,0.08)",
                    borderColor: "rgba(184,138,27,0.34)",
                  },
                }}
              >
                <Typography variant="body2">{prompt}</Typography>
              </ButtonBase>
            ))}
          </Stack>

          <ButtonBase
            onClick={() => start("Hello, I would like to ask about your custom shields.")}
            sx={{
              mt: 1.5,
              width: "100%",
              py: 1.2,
              borderRadius: 2,
              gap: 1,
              color: "#fff",
              background: "linear-gradient(135deg, #d8b454 0%, #b88a1b 55%, #8f6812 100%)",
              boxShadow: "0 8px 20px rgba(184, 138, 27, 0.32)",
              "&:hover": {
                background: "linear-gradient(135deg, #d0a53a 0%, #9d7314 55%, #7e5b10 100%)",
              },
            }}
          >
            <WhatsAppIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Start a chat
            </Typography>
          </ButtonBase>
        </Paper>
      </Fade>

      <ButtonBase
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        sx={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          color: "#fff",
          background: "linear-gradient(135deg, #d8b454 0%, #b88a1b 55%, #8f6812 100%)",
          border: "1px solid rgba(255,253,249,0.42)",
          boxShadow: "0 12px 28px rgba(184, 138, 27, 0.42)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "scale(1.06)",
            boxShadow: "0 14px 32px rgba(184, 138, 27, 0.54)",
          },
        }}
      >
        {open ? <CloseIcon /> : <WhatsAppIcon sx={{ fontSize: 30 }} />}
      </ButtonBase>
    </Box>
  );
}
