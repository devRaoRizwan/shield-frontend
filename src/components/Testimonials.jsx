import { useEffect, useId, useState } from "react";
import { Box, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

// Flat vector portraits built from the gold palette: a tinted disc, blazer,
// collar and hair, deliberately faceless so no client is caricatured.
const GOLD = "#b88a1b";
const GOLD_DARK = "#8f6812";
const DISC = "#f7ecd2";
const SKIN = "#fbf1dc";
const SHIRT = "#fffdf9";

function MaleAvatar() {
  const clipId = useId();
  return (
    <Box component="svg" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="32" cy="32" r="30" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <circle cx="32" cy="32" r="30" fill={DISC} />
        <path d="M28 34h8v11h-8z" fill={SKIN} />
        <path d="M2 64c0-13 13-20 30-20s30 7 30 20z" fill={GOLD} />
        <path d="M24 45.5l8 8 8-8-4-2.5-4 3-4-3z" fill={SHIRT} />
        <path d="M31 52.5l-1.6 11.5h5.2L33 52.5z" fill={GOLD_DARK} />
        <ellipse cx="32" cy="25" rx="11.2" ry="12.8" fill={SKIN} />
        <path d="M20.6 26.4C20.6 16.4 25.6 11.4 32 11.4s11.4 5 11.4 15c-2.3-5.9-5.9-8-11.4-8s-9.1 2.1-11.4 8z" fill={GOLD_DARK} />
        <ellipse cx="20.6" cy="27.5" rx="2.1" ry="2.6" fill={SKIN} />
        <ellipse cx="43.4" cy="27.5" rx="2.1" ry="2.6" fill={SKIN} />
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke={GOLD} strokeWidth="2" />
    </Box>
  );
}

function FemaleAvatar() {
  const clipId = useId();
  return (
    <Box component="svg" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="32" cy="32" r="30" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <circle cx="32" cy="32" r="30" fill={DISC} />
        <path d="M18.4 29c0-11.6 6.1-18.6 13.6-18.6S45.6 17.4 45.6 29c0 8.4-.7 15-1.9 20.4H20.3C19.1 44 18.4 37.4 18.4 29z" fill={GOLD_DARK} />
        <path d="M28.6 34h6.8v11h-6.8z" fill={SKIN} />
        <path d="M2 64c0-13 13-20 30-20s30 7 30 20z" fill={GOLD} />
        <path d="M25 45.5l7 8.5 7-8.5-3.5-2.5-3.5 3-3.5-3z" fill={SHIRT} />
        <ellipse cx="32" cy="25" rx="10.7" ry="12.4" fill={SKIN} />
        <path d="M21.3 26C21.3 16.6 26 12 32 12s10.7 4.6 10.7 14c-2.2-6-5.5-8.2-10.7-8.2S23.5 20 21.3 26z" fill={GOLD_DARK} />
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke={GOLD} strokeWidth="2" />
    </Box>
  );
}

/**
 * Real client testimonials, supplied by Shield House. Only publish words a client
 * actually said, and only with their permission.
 *
 * `avatar` picks the illustration ("male" | "female") — it is stated per client
 * rather than guessed from the name in code. `organisation` and `city` are
 * optional; omit them rather than guessing.
 */
const testimonials = [
  {
    headline: "The finish was better than we expected.",
    quote:
      "We ordered custom shields for our annual corporate awards. The craftsmanship and finish were of a higher standard than we had anticipated, and the detailing held up across the whole order. We would recommend them to other organizations.",
    name: "Usman Ali",
    role: "HR Director",
    avatar: "male",
  },
  {
    headline: "The order arrived on schedule.",
    quote:
      "Shield House prepared customized award shields for our school's annual prize distribution. The designs suited the occasion, the order reached us on time, and the students were pleased with them.",
    name: "Ayesha Khan",
    role: "Principal",
    avatar: "female",
  },
  {
    headline: "Responsive from design through to delivery.",
    quote:
      "The team stayed in contact from the first design discussion to the final delivery, which made the process straightforward on our end. The shields were well finished. We expect to order again.",
    name: "Bilal Ahmed",
    role: "Event Organizer",
    avatar: "male",
  },
  {
    headline: "They delivered close to our brief.",
    quote:
      "We needed custom shields for a large recognition program. The work was handled in house and what we received was close to the brief we had given them.",
    name: "Fatima Zahra",
    role: "Corporate Communications",
    avatar: "female",
  },
  {
    headline: "They understood what we were trying to do.",
    quote:
      "The team took the time to understand what we wanted and produced shields that suited our award ceremony. Production was reliable and there was nothing we had to follow up on.",
    name: "Hassan Raza",
    role: "Institute Director",
    avatar: "male",
  },
  {
    headline: "More consistent than our previous supplier.",
    quote:
      "We have used other suppliers before. Shield House has been more consistent in finish and more accommodating on customization, and our own clients responded well to the result.",
    name: "Sana Malik",
    role: "Event Management",
    avatar: "female",
  },
];

const ROTATE_MS = 6500;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const count = testimonials.length;

  useEffect(() => {
    if (reduceMotion || paused || count < 2) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduceMotion, count]);

  if (count === 0) {
    return null;
  }

  const go = (next) => setIndex((next + count) % count);

  return (
    <Box
      component="section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        background: (theme) => theme.customGradients.highlight,
        boxShadow: (theme) => theme.customShadows.medium,
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 1, textAlign: "center" }}>
        What our clients say
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: 3 }}
      >
        Schools, offices and event organizers who have trusted us with their recognition
        ceremonies.
      </Typography>

      <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }} alignItems="center">
        <IconButton
          aria-label="Previous testimonial"
          onClick={() => go(index - 1)}
          sx={{ flexShrink: 0 }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <Stack
            direction="row"
            sx={{
              transform: `translateX(-${index * 100}%)`,
              transition: reduceMotion ? "none" : "transform 0.55s ease",
            }}
          >
            {testimonials.map((item) => (
              <Box
                key={item.name}
                sx={{ width: "100%", flexShrink: 0, px: { xs: 0.5, sm: 2 }, py: 1 }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 2, sm: 3 }}
                  alignItems={{ xs: "center", sm: "flex-start" }}
                  sx={{ textAlign: { xs: "center", sm: "left" } }}
                >
                  <Box
                    sx={{
                      width: 76,
                      height: 76,
                      flexShrink: 0,
                      color: "primary.main",
                      "& svg": { width: "100%", height: "100%", display: "block" },
                    }}
                  >
                    {item.avatar === "female" ? <FemaleAvatar /> : <MaleAvatar />}
                  </Box>

                  <Box>
                    <FormatQuoteIcon
                      sx={{ color: "primary.main", fontSize: 26, mb: 0.25, display: "block", mx: { xs: "auto", sm: 0 } }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                      {item.headline}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                      {item.quote}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {[item.role, item.organisation].filter(Boolean).join(", ")}
                    </Typography>
                    {item.city ? (
                      <Typography
                        variant="caption"
                        sx={{ color: "#7e5b10", letterSpacing: "0.08em" }}
                      >
                        {item.city.toUpperCase()}
                      </Typography>
                    ) : null}
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>

        <IconButton
          aria-label="Next testimonial"
          onClick={() => go(index + 1)}
          sx={{ flexShrink: 0 }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
        {testimonials.map((item, i) => (
          <Box
            key={item.name}
            component="button"
            type="button"
            aria-label={`Show testimonial from ${item.name}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            sx={{
              width: i === index ? 22 : 8,
              height: 8,
              p: 0,
              border: 0,
              borderRadius: 999,
              cursor: "pointer",
              transition: "all 0.3s ease",
              background: i === index ? "#b88a1b" : "rgba(184,138,27,0.28)",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
