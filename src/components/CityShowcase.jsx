import { useEffect, useState } from "react";
import { Box, ButtonBase, Stack, Typography, useMediaQuery } from "@mui/material";

// Landmarks are drawn rather than photographed: no licensing questions, no image
// weight on a page we are trying to keep fast, and the stroke inherits the gold.
const svgProps = {
  viewBox: "0 0 120 96",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function MinarEPakistan() {
  return (
    <Box component="svg" {...svgProps} aria-hidden="true">
      <path d="M18 88h84" />
      <path d="M26 88V80h68v8" />
      <path d="M34 80V72h52v8" />
      <path d="M44 72q0-15 16-15t16 15" />
      <path d="M53 57l4-33h6l4 33z" />
      <path d="M60 24v-6" />
      <circle cx="60" cy="13" r="3.5" />
    </Box>
  );
}

function MazarEQuaid() {
  return (
    <Box component="svg" {...svgProps} aria-hidden="true">
      <path d="M16 88h88" />
      <path d="M30 88V54h60v34" />
      <path d="M30 54q30-30 60 0" />
      <path d="M60 24v-7" />
      <path d="M52 88V71q8-9 16 0v17" />
      <path d="M38 64v8M82 64v8" />
    </Box>
  );
}

function FaisalMosque() {
  return (
    <Box component="svg" {...svgProps} aria-hidden="true">
      <path d="M12 88h96" />
      <path d="M32 88l28-44 28 44z" />
      <path d="M46 88l14-24 14 24" />
      <path d="M22 88V36" />
      <circle cx="22" cy="31" r="3" />
      <path d="M98 88V36" />
      <circle cx="98" cy="31" r="3" />
    </Box>
  );
}

function ShrineOfBahauddin() {
  return (
    <Box component="svg" {...svgProps} aria-hidden="true">
      <path d="M16 88h88" />
      <path d="M34 88V62h52v26" />
      <path d="M40 62V52h40v10" />
      <path d="M44 52q16-32 32 0" />
      <path d="M60 21v-8" />
      <path d="M50 88V72q10-10 20 0v16" />
      <path d="M34 62v-7M86 62v-7" />
    </Box>
  );
}

function ClockTower() {
  return (
    <Box component="svg" {...svgProps} aria-hidden="true">
      <path d="M20 88h80" />
      <path d="M42 88V42h36v46" />
      <path d="M42 42q18-16 36 0" />
      <path d="M60 24v-7" />
      <circle cx="60" cy="56" r="9" />
      <path d="M60 56v-5M60 56h4" />
      <path d="M34 88V78h52v10" />
    </Box>
  );
}

function BalaHisarFort() {
  return (
    <Box component="svg" {...svgProps} aria-hidden="true">
      <path d="M12 88h96" />
      <path d="M24 88V58h50v30" />
      <path d="M24 58v-8h8v8M40 58v-8h8v8M56 58v-8h8v8" />
      <path d="M36 88V70h14v18" />
      <path d="M78 88V62a10 10 0 0120 0v26" />
      <path d="M78 62v-7h8v7M90 62v-7h8v7" />
    </Box>
  );
}

function KohEChiltan() {
  return (
    <Box component="svg" {...svgProps} aria-hidden="true">
      <path d="M10 88h100" />
      <path d="M14 88l30-46 20 26 14-16 28 36z" />
      <path d="M37 52l7-10 7 10" />
      <path d="M72 60l6-8 6 8" />
    </Box>
  );
}

function NoorMahal() {
  return (
    <Box component="svg" {...svgProps} aria-hidden="true">
      <path d="M14 88h92" />
      <path d="M26 88V60h68v28" />
      <path d="M46 60q14-19 28 0" />
      <path d="M60 41v-7" />
      <path d="M26 60q6-9 12 0M82 60q6-9 12 0" />
      <path d="M40 88V74q4-6 8 0v14M56 88V74q4-6 8 0v14M72 88V74q4-6 8 0v14" />
    </Box>
  );
}

const cities = [
  { city: "Multan", landmark: "Shrine of Bahauddin Zakariya", note: "Our workshop city", Art: ShrineOfBahauddin },
  { city: "Lahore", landmark: "Minar-e-Pakistan", note: "Courier delivery", Art: MinarEPakistan },
  { city: "Karachi", landmark: "Mazar-e-Quaid", note: "Courier delivery", Art: MazarEQuaid },
  { city: "Islamabad", landmark: "Faisal Mosque", note: "Courier delivery", Art: FaisalMosque },
  { city: "Faisalabad", landmark: "Ghanta Ghar Clock Tower", note: "Courier delivery", Art: ClockTower },
  { city: "Peshawar", landmark: "Bala Hisar Fort", note: "Courier delivery", Art: BalaHisarFort },
  { city: "Quetta", landmark: "Koh-e-Chiltan", note: "Courier delivery", Art: KohEChiltan },
  { city: "Bahawalpur", landmark: "Noor Mahal", note: "Courier delivery", Art: NoorMahal },
];

const ROTATE_MS = 3400;

export default function CityShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // `index` is a dependency so picking a city by hand restarts the dwell time.
  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % cities.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduceMotion]);

  const active = cities[index];
  const { Art } = active;

  return (
    <Box onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 3 }}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 2.5 }}
      >
        <Box
          sx={{
            width: 132,
            height: 108,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            borderRadius: 2,
            color: "primary.main",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            background: "linear-gradient(160deg, rgba(255,253,249,0.96), rgba(244,231,191,0.5))",
          }}
        >
          <Box
            key={index}
            sx={{
              width: 108,
              display: "grid",
              placeItems: "center",
              "@keyframes cityArtIn": {
                from: { opacity: 0, transform: "translateY(8px) scale(0.96)" },
                to: { opacity: 1, transform: "translateY(0) scale(1)" },
              },
              animation: reduceMotion ? "none" : "cityArtIn 0.55s ease",
              "& svg": { width: "100%", height: "auto", display: "block" },
            }}
          >
            <Art />
          </Box>
        </Box>

        <Box
          key={`label-${index}`}
          sx={{
            textAlign: { xs: "center", sm: "left" },
            minWidth: { sm: 240 },
            "@keyframes cityTextIn": {
              from: { opacity: 0, transform: "translateY(6px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
            animation: reduceMotion ? "none" : "cityTextIn 0.55s ease",
          }}
        >
          <Typography variant="overline" sx={{ color: "#7e5b10", letterSpacing: "0.14em" }}>
            {active.note}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {active.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {active.landmark}
          </Typography>
        </Box>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {cities.map((item, i) => {
          const isActive = i === index;
          return (
            <ButtonBase
              key={item.city}
              onClick={() => setIndex(i)}
              aria-pressed={isActive}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 999,
                fontSize: 14,
                transition: "all 0.25s ease",
                border: (theme) =>
                  `1px solid ${isActive ? "rgba(184,138,27,0.6)" : theme.palette.divider}`,
                color: isActive ? "#5f430b" : "text.secondary",
                background: isActive
                  ? "linear-gradient(135deg, rgba(216,180,84,0.34), rgba(184,138,27,0.18))"
                  : "rgba(255,253,249,0.78)",
                fontWeight: isActive ? 700 : 400,
              }}
            >
              {item.city}
            </ButtonBase>
          );
        })}
      </Stack>
    </Box>
  );
}
