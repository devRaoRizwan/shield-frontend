import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

export default function AboutPage() {
  const features = [
    {
      title: "Complete In-House Manufacturing",
      text: "Every shield goes through our controlled process for precision and consistency.",
      icon: <PrecisionManufacturingOutlinedIcon color="primary" />,
    },
    {
      title: "Premium Event Impact",
      text: "Our customized awards are designed to elevate recognition moments and brand value.",
      icon: <WorkspacePremiumOutlinedIcon color="primary" />,
    },
    {
      title: "Creative Customization",
      text: "From finishing to structure, we shape each design around your event identity.",
      icon: <AutoAwesomeOutlinedIcon color="primary" />,
    },
    {
      title: "Reliable Delivery",
      text: "Timely execution and dependable support from concept to final dispatch.",
      icon: <LocalShippingOutlinedIcon color="primary" />,
    },
  ];

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          p: { xs: 3, md: 4.5 },
          borderRadius: 4,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          background: (theme) => theme.customGradients.highlight,
          boxShadow: (theme) => theme.customShadows.medium,
        }}
      >
        <Grid container spacing={3} alignItems="stretch">
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h3" sx={{ mb: 1.2, textAlign: { xs: "center", md: "left" } }}>
              About Us
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 980, mb: 2 }}>
              At Shield House, we specialize in crafting high-quality, customized award shields
              designed to make every achievement truly unforgettable. With a strong commitment to
              excellence, we handle the entire manufacturing process in-house, ensuring precision,
              durability, and a premium finish in every product we create.
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 980, mb: 2 }}>
              Our mission is simple yet powerful: to make your events memorable. Whether it is an
              academic ceremony, corporate recognition program, or a large-scale award show, we
              provide tailor-made solutions that reflect the significance of every occasion.
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 980, mb: 2 }}>
              We proudly serve institute owners, event organizers, and private industries who value
              uniqueness and quality in their awards. What sets us apart is our complete control over
              production, allowing us to deliver customized designs with consistency, creativity, and
              reliability.
            </Typography>
            <Typography sx={{ maxWidth: 980, fontWeight: 600 }}>
              At Shield House, we do not just create awards - we create lasting impressions.
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ display: "flex", alignItems: { xs: "center", md: "flex-end" } }}
          >
            <Box
              component="img"
              src="/image.png"
              alt="Shield House"
              sx={{
                width: "100%",
                maxWidth: 315,
                mx: "auto",
                display: "block",
                borderRadius: "50%",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                boxShadow: (theme) => theme.customShadows.soft,
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ mb: 1.2 }}>{feature.icon}</Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">{feature.text}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {[
          {
            title: "Why Choose Shield House",
            text: "Choosing Shield House means choosing quality, reliability, and complete customization.",
          },
          {
            title: "Complete In-House Control",
            text: "As we manage our entire manufacturing process ourselves, we ensure strict quality control, timely delivery, and the flexibility to bring your unique ideas to life.",
          },
          {
            title: "Trusted Results",
            text: "Our attention to detail, customer-focused approach, and commitment to excellence make us a trusted partner for all award and recognition needs.",
          },
          {
            title: "Beyond Expectations",
            text: "Whether your requirement is simple or highly customized, we are dedicated to delivering results that exceed expectations.",
          },
        ].map((section) => (
          <Grid key={section.title} size={{ xs: 12, md: 6 }}>
            <Card elevation={2} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1.2 }}>
                  {section.title}
                </Typography>
                <Divider sx={{ mb: 1.4 }} />
                <Typography color="text.secondary">{section.text}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
