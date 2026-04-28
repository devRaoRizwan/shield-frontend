import { alpha, createTheme } from "@mui/material/styles";

const gold = {
  50: "#fbf6e8",
  100: "#f4e7bf",
  200: "#ebd28f",
  300: "#dfbb5e",
  400: "#d0a53a",
  500: "#b88a1b",
  600: "#9d7314",
  700: "#7e5b10",
  800: "#5f430b",
  900: "#3f2b07",
};

const neutral = {
  50: "#fcfbf8",
  100: "#f6f2ea",
  200: "#ece4d5",
  300: "#dbcfbc",
  400: "#b7a996",
  500: "#8d7f70",
  600: "#6b6056",
  700: "#4b433c",
  800: "#2e2924",
  900: "#171411",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: gold[300],
      main: gold[500],
      dark: gold[700],
      contrastText: "#24190a",
    },
    secondary: {
      light: "#5f5a54",
      main: "#2f2922",
      dark: "#171411",
      contrastText: "#fffdfa",
    },
    background: {
      default: "#f8f5ef",
      paper: "#fffdf9",
    },
    text: {
      primary: neutral[800],
      secondary: neutral[600],
    },
    divider: alpha(gold[500], 0.24),
    success: {
      main: "#3f7a52",
    },
    error: {
      main: "#b24c3d",
    },
    warning: {
      main: "#c27a22",
    },
    info: {
      main: "#7b6742",
    },
  },
  customGradients: {
    page:
      "radial-gradient(circle at 12% 12%, rgba(184,138,27,0.09), transparent 30%), radial-gradient(circle at 88% 18%, rgba(123,103,66,0.08), transparent 26%), linear-gradient(180deg, #fdfbf7 0%, #f8f5ef 52%, #f5f0e8 100%)",
    heroOverlay:
      "linear-gradient(110deg, rgba(21,17,12,0.72) 0%, rgba(36,28,17,0.46) 46%, rgba(20,15,10,0.72) 100%)",
    banner:
      "linear-gradient(90deg, rgba(184,138,27,0.10), rgba(255,253,249,0.98) 22%, rgba(255,253,249,0.98) 78%, rgba(123,103,66,0.12))",
    highlight:
      "linear-gradient(135deg, rgba(184,138,27,0.14), rgba(255,253,249,0.98) 44%, rgba(232,223,207,0.92) 100%)",
    surface:
      "linear-gradient(165deg, rgba(255,253,249,0.98), rgba(248,243,234,0.96))",
    surfaceStrong:
      "linear-gradient(155deg, rgba(255,253,249,1), rgba(244,237,225,0.97))",
  },
  customShadows: {
    soft: "0 14px 34px rgba(68, 52, 24, 0.08)",
    medium: "0 22px 48px rgba(68, 52, 24, 0.12)",
    strong: "0 28px 60px rgba(68, 52, 24, 0.16)",
    inset: "inset 0 1px 0 rgba(255,255,255,0.72)",
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, color: neutral[800] },
    h2: { fontWeight: 700, color: neutral[800] },
    h3: { fontWeight: 700, color: neutral[800] },
    h4: { fontWeight: 700, color: neutral[800] },
    h5: { fontWeight: 700, color: neutral[800] },
    h6: { fontWeight: 700, color: neutral[800] },
    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f8f5ef",
        },
        "::selection": {
          backgroundColor: alpha(gold[400], 0.28),
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "linear-gradient(165deg, rgba(255,253,249,0.98), rgba(248,243,234,0.96))",
          border: `1px solid ${alpha(gold[500], 0.2)}`,
          boxShadow: "0 14px 34px rgba(68, 52, 24, 0.08), inset 0 1px 0 rgba(255,255,255,0.72)",
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "linear-gradient(165deg, rgba(255,253,249,0.98), rgba(248,243,234,0.96))",
          border: `1px solid ${alpha(gold[500], 0.2)}`,
          boxShadow: "0 14px 34px rgba(68, 52, 24, 0.08)",
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
          minHeight: 44,
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #d8b454 0%, #b88a1b 55%, #8f6812 100%)",
          color: "#24190a",
          boxShadow: "0 12px 26px rgba(184, 138, 27, 0.28)",
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #403831 0%, #2f2922 100%)",
          color: "#fffdf9",
          boxShadow: "0 12px 26px rgba(47, 41, 34, 0.18)",
        },
        outlinedPrimary: {
          borderColor: alpha(gold[500], 0.38),
          color: gold[700],
          backgroundColor: alpha(gold[50], 0.72),
        },
        outlinedSecondary: {
          borderColor: alpha("#2f2922", 0.22),
        },
        textPrimary: {
          color: gold[700],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha(gold[500], 0.22),
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: alpha("#ffffff", 0.72),
          borderRadius: 12,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(gold[500], 0.24),
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(gold[500], 0.42),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1,
            borderColor: gold[500],
          },
        },
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #fffdf9 inset",
            WebkitTextFillColor: neutral[800],
            caretColor: neutral[800],
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: neutral[600],
          "&.Mui-focused": {
            color: gold[700],
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          border: `1px solid ${alpha(gold[500], 0.2)}`,
          backgroundColor: alpha("#ffffff", 0.74),
          color: gold[700],
          "&:hover": {
            backgroundColor: alpha(gold[50], 0.95),
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: gold[500],
          },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: alpha(gold[500], 0.55),
          },
        },
        track: {
          backgroundColor: alpha(neutral[500], 0.35),
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${alpha(gold[500], 0.16)}`,
        },
      },
    },
  },
});

export default theme;
