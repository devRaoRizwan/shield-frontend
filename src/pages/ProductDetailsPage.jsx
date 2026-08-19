import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Link, Navigate, useParams } from "react-router-dom";
import { getProduct } from "../lib/api";
import { buildWhatsappLink } from "../lib/contact";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const product = getProduct(slug);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const shieldId = product.slug.toUpperCase();
  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/shop/${product.slug}`
      : `/shop/${product.slug}`;

  const whatsappLink = buildWhatsappLink(
    [
      "Hello, I want to contact you about this product.",
      `Shield ID: ${shieldId}`,
      `Product URL: ${productUrl}`,
    ].join("\n")
  );

  return (
    <Stack spacing={3}>
      <Box>
        <Button component={Link} to="/shop" variant="text" sx={{ px: 0, mb: 1 }}>
          Back to Shop
        </Button>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
      </Box>

      <Card elevation={2} sx={{ width: "100%" }}>
        <Grid container alignItems="stretch">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              decoding="async"
              sx={{
                width: "100%",
                height: "100%",
                minHeight: 420,
                objectFit: "cover",
                display: "block",
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CardContent sx={{ p: { xs: 2.5, md: 4 }, height: "100%" }}>
              <Stack spacing={3} sx={{ height: "100%" }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Shield ID: {shieldId}
                  </Typography>
                </Box>

                <Box>
                  <Typography color="text.secondary">{product.details}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.75 }}>
                    Customization Option
                  </Typography>
                  <Typography color="text.secondary">
                    {product.customization_option || "Custom options available on request."}
                  </Typography>
                </Box>

                <Button
                  component="a"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  sx={{ alignSelf: "flex-start", mt: "auto" }}
                >
                  Contact on WhatsApp
                </Button>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}
