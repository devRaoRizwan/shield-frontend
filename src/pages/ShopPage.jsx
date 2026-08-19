import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getProducts } from "../lib/api";

export function ShopSection() {
  const products = getProducts();

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
          Shop
        </Typography>
        <Typography color="text.secondary">
          Explore our collection of premium custom shields designed to honor every achievement.
        </Typography>
      </Box>

      {products.length === 0 ? <Alert severity="info">No products are available yet.</Alert> : null}

      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid key={product.slug} size={{ xs: 6, sm: 4, md: 4 }}>
            <Card elevation={2} sx={{ height: "100%" }}>
              <CardActionArea
                component={Link}
                to={`/shop/${product.slug}`}
                sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
              >
                <Box
                  component="img"
                  src={product.thumb || product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  loading={index < 6 ? "eager" : "lazy"}
                  decoding="async"
                  sx={{
                    width: "calc(100% - 16px)",
                    height: { xs: 180, sm: 220, md: 260 },
                    objectFit: "cover",
                    display: "block",
                    mx: 1,
                    mt: 1,
                    borderRadius: 1,
                  }}
                />
                <CardContent sx={{ flex: 1, textAlign: "center" }}>
                  <Typography variant="h6">{product.name}</Typography>
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
