import { useEffect, useRef, useState } from "react";
import { Box, Skeleton } from "@mui/material";

/**
 * Image that holds its own space and shows a skeleton until it has loaded, so
 * nothing on the page jumps while images arrive.
 *
 * `sx` sizes the wrapper (the space reserved up front); the image fills it.
 */
export default function ImageWithSkeleton({
  src,
  alt,
  sx,
  objectFit = "cover",
  imgBgcolor,
  aspectRatio,
  ...imgProps
}) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish decoding before React attaches onLoad, which
  // would otherwise leave the skeleton on screen for good.
  useEffect(() => {
    if (ref.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <Box sx={{ position: "relative", overflow: "hidden", aspectRatio, ...sx }}>
      {loaded ? null : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(184,138,27,0.10)",
            "&::after": {
              background:
                "linear-gradient(90deg, transparent, rgba(255,253,249,0.65), transparent)",
            },
          }}
        />
      )}
      <Box
        component="img"
        ref={ref}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        sx={{
          width: "100%",
          height: "100%",
          objectFit,
          display: "block",
          bgcolor: imgBgcolor,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
        {...imgProps}
      />
    </Box>
  );
}
