import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Alert,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMediaUrl, getProducts } from "../lib/api";

export function ShopSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const data = await getProducts();
        if (isMounted) {
          setProducts(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load products right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
          Shop
        </Typography>
        <Typography color="text.secondary">
          Browse starter catalog items for your Shield House platform.
        </Typography>
      </Box>

      {loading ? (
        <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
          <CircularProgress />
        </Stack>
      ) : null}

      {error ? <Alert severity="error">{error}</Alert> : null}

      {!loading && !error && products.length === 0 ? (
        <Alert severity="info">No products are available yet.</Alert>
      ) : null}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.name} size={{ xs: 12, md: 4 }}>
            <Card elevation={2} sx={{ height: "100%" }}>
              <CardActionArea
                component={Link}
                to={`/shop/${product.slug}`}
                sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
              >
                <Box
                  component="img"
                  src={getMediaUrl(product.image)}
                  alt={product.name}
                  sx={{
                    width: "calc(100% - 16px)",
                    height: 260,
                    objectFit: "cover",
                    display: "block",
                    mx: 1,
                    mt: 1,
                    borderRadius: 1,
                  }}
                />
                <CardContent sx={{ flex: 1, textAlign: "center" }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default function ShopPage() {
  return <ShopSection />;
}
