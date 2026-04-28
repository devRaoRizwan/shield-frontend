import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Alert, Box, Button, Card, CardContent, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMediaUrl, getProduct } from "../lib/api";

const whatsappNumber = "923027036363";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      setLoading(true);
      setNotFound(false);
      setError("");

      try {
        const data = await getProduct(slug);
        if (isMounted) {
          setProduct(data);
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }

        if (err.message?.includes("404")) {
          setNotFound(true);
          setProduct(null);
          return;
        }

        setError(err.message || "Unable to load this product right now.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (notFound) {
    return <Navigate to="/shop" replace />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!product) {
    return null;
  }

  const shieldId = product.slug.toUpperCase();
  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/shop/${product.slug}`
      : `/shop/${product.slug}`;

  const whatsappMessage = encodeURIComponent(
    [
      "Hello, I want to contact you about this product.",
      `Shield ID: ${shieldId}`,
      `Product URL: ${productUrl}`,
    ].join("\n")
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

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
              src={getMediaUrl(product.image)}
              alt={product.name}
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
                </Box>

                <Box>
                  <Typography color="text.secondary">{product.details}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.75 }}>
                    Customization Option
                  </Typography>
                  <Typography color="text.secondary">{product.customization_option || "Custom options available on request."}</Typography>
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
