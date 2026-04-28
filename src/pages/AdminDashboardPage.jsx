import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  createAdminProduct,
  deleteAdminInquiry,
  deleteAdminProduct,
  getAdminInquiries,
  getAdminProducts,
  getMediaUrl,
  updateAdminProduct,
} from "../lib/api";
import { useAdminAuth } from "../context/AdminAuthContext";

const emptyForm = {
  id: null,
  name: "",
  slug: "",
  description: "",
  details: "",
  customization_option: "",
  is_active: true,
  image: null,
};

function toFormState(product) {
  return {
    id: product.id,
    name: product.name || "",
    slug: product.slug || "",
    description: product.description || "",
    details: product.details || "",
    customization_option: product.customization_option || "",
    is_active: Boolean(product.is_active),
    image: null,
  };
}

export default function AdminDashboardPage() {
  const { token, user, logout } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [resolvingInquiryId, setResolvingInquiryId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedId) || null,
    [products, selectedId]
  );

  async function refreshDashboard() {
    await Promise.all([loadProducts(), loadInquiries()]);
  }

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminProducts(token);
      setProducts(data);

      if (selectedId) {
        const updatedSelection = data.find((product) => product.id === selectedId);
        if (updatedSelection) {
          setForm(toFormState(updatedSelection));
          setImagePreview(updatedSelection.image || "");
        } else {
          setSelectedId(null);
          setForm(emptyForm);
          setImagePreview("");
        }
      }
    } catch (err) {
      setError(err.message || "Unable to load products right now.");
    } finally {
      setLoading(false);
    }
  }

  async function loadInquiries() {
    try {
      const data = await getAdminInquiries(token);
      setInquiries(data);
    } catch (err) {
      setError(err.message || "Unable to load inquiries right now.");
    }
  }

  useEffect(() => {
    refreshDashboard();
  }, [token]);

  function handleSelectProduct(product) {
    setSelectedId(product.id);
    setForm(toFormState(product));
    setImagePreview(product.image || "");
    setSuccess("");
    setError("");
  }

  function handleCreateNew() {
    setSelectedId(null);
    setForm(emptyForm);
    setImagePreview("");
    setSuccess("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      details: form.details,
      customization_option: form.customization_option,
      is_active: form.is_active,
      ...(form.image ? { image: form.image } : {}),
    };

    try {
      const savedProduct = form.id
        ? await updateAdminProduct(token, form.id, payload)
        : await createAdminProduct(token, { ...payload, image: form.image });

      setSuccess(form.id ? "Product updated successfully." : "Product created successfully.");
      await loadProducts();
      setSelectedId(savedProduct.id);
      setForm(toFormState(savedProduct));
      setImagePreview(savedProduct.image || "");
    } catch (err) {
      setError(err.message || "Unable to save this product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!form.id) {
      return;
    }

    const confirmed = window.confirm(`Delete "${form.name}"?`);
    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");
    setSuccess("");

    try {
      await deleteAdminProduct(token, form.id);
      setSuccess("Product deleted successfully.");
      setSelectedId(null);
      setForm(emptyForm);
      setImagePreview("");
      await loadProducts();
    } catch (err) {
      setError(err.message || "Unable to delete this product.");
    } finally {
      setDeleting(false);
    }
  }

  async function handleSolveInquiry(inquiryId) {
    setResolvingInquiryId(inquiryId);
    setError("");
    setSuccess("");

    try {
      await deleteAdminInquiry(token, inquiryId);
      setInquiries((current) => current.filter((inquiry) => inquiry.id !== inquiryId));
      setSuccess("Query marked as solved.");
    } catch (err) {
      setError(err.message || "Unable to remove this query right now.");
    } finally {
      setResolvingInquiryId(null);
    }
  }

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: { xs: 3, md: 4 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Product Admin
            </Typography>
            <Typography color="text.secondary">
              Signed in as {user?.username}. Add, edit, publish, and delete products from the same site your customers use.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button variant="outlined" startIcon={<RefreshOutlinedIcon />} onClick={refreshDashboard}>
              Refresh
            </Button>
            <Button variant="contained" startIcon={<Inventory2OutlinedIcon />} onClick={handleCreateNew}>
              New Product
            </Button>
            <Button variant="outlined" color="inherit" startIcon={<LogoutOutlinedIcon />} onClick={logout}>
              Logout
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {error ? <Alert severity="error">{error}</Alert> : null}
      {success ? <Alert severity="success">{success}</Alert> : null}

      <Grid container spacing={3} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 0, overflow: "hidden", height: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2.5, py: 2 }}>
              <Typography variant="h6">Products</Typography>
              <Chip label={`${products.length} total`} size="small" />
            </Stack>
            <Divider />
            <Stack spacing={1.5} sx={{ p: 1 ,maxHeight: "700px", overflowY: "auto",}}>
              {products.map((product) => (
                <Box
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    cursor: "pointer",
                    border: selectedId === product.id
                      ? "1px solid rgba(184,138,27,0.42)"
                      : (theme) => `1px solid ${theme.palette.divider}`,
                    background: selectedId === product.id
                      ? "linear-gradient(135deg, rgba(184,138,27,0.18), rgba(255,253,249,0.98))"
                      : "linear-gradient(145deg, rgba(255,253,249,0.98), rgba(248,243,234,0.95))",
                    boxShadow: selectedId === product.id
                      ? "0 18px 34px rgba(68, 52, 24, 0.14)"
                      : "0 10px 24px rgba(68, 52, 24, 0.08)",
                    transition: "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      borderColor: "rgba(184,138,27,0.34)",
                      boxShadow: "0 16px 30px rgba(68, 52, 24, 0.12)",
                    },
                  }}
                >
                  <Stack spacing={1.2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
                          {product.slug}
                        </Typography>
                      </Box>
                      <Chip
                        label={product.is_active ? "Published" : "Hidden"}
                        size="small"
                        color={product.is_active ? "success" : "default"}
                        variant={selectedId === product.id ? "filled" : "outlined"}
                      />
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: 40,
                      }}
                    >
                      {product.description}
                    </Typography>
                  </Stack>
                </Box>
              ))}
              {!loading && products.length === 0 ? (
                <Box sx={{ px: 2.5, py: 4 }}>
                  <Typography color="text.secondary">No products yet. Start by creating your first one.</Typography>
                </Box>
              ) : null}
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Box>
                  <Typography variant="h6">
                    {form.id ? "Edit Product" : "Create Product"}
                  </Typography>
                  <Typography color="text.secondary">
                    Fill in the product content and publish when you are ready.
                  </Typography>
                </Box>
                {selectedProduct ? (
                  <Chip
                    label={selectedProduct.is_active ? "Published" : "Hidden"}
                    color={selectedProduct.is_active ? "success" : "default"}
                    variant="outlined"
                  />
                ) : null}
              </Stack>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Product Name"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Shield ID"
                    value={form.slug}
                    onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  <TextField
                    label="Short Description"
                    value={form.description}
                    onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Details"
                    value={form.details}
                    onChange={(event) => setForm((current) => ({ ...current, details: event.target.value }))}
                    multiline
                    rows={5}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Customization Option"
                    value={form.customization_option}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, customization_option: event.target.value }))
                    }
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={1}>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<AddPhotoAlternateOutlinedIcon />}
                    >
                      {form.image ? "Replace Image" : "Upload Image"}
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0] || null;
                          setForm((current) => ({ ...current, image: file }));
                          setImagePreview(file ? URL.createObjectURL(file) : selectedProduct?.image || "");
                        }}
                      />
                    </Button>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Switch
                        checked={form.is_active}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, is_active: event.target.checked }))
                        }
                      />
                      <Typography>{form.is_active ? "Published" : "Hidden"}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      minHeight: 180,
                      borderRadius: 2,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      bgcolor: "rgba(255,253,249,0.84)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {imagePreview ? (
                      <Box
                        component="img"
                        src={getMediaUrl(imagePreview)}
                        alt={form.name || "Preview"}
                        sx={{ width: "100%", height: 220, objectFit: "contain"}}
                      />
                    ) : (
                      <Typography color="text.secondary">Image preview will appear here.</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Divider />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button type="submit" variant="contained" startIcon={form.id ? <SaveOutlinedIcon /> : <EditOutlinedIcon />} disabled={saving}>
                  {saving ? "Saving..." : form.id ? "Update Product" : "Create Product"}
                </Button>
                {form.id ? (
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete Product"}
                  </Button>
                ) : null}
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h6">Customer Queries</Typography>
            <Typography color="text.secondary">
              Messages submitted from the contact page appear here for the admin to review.
            </Typography>
          </Box>
          <Chip label={`${inquiries.length} queries`} size="small" />
        </Stack>

        <Stack spacing={2}>
          {inquiries.map((inquiry) => (
            <Paper key={inquiry.id} sx={{ p: 2.5, bgcolor: "rgba(255,253,249,0.86)" }}>
              <Stack spacing={1}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={1}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", md: "center" }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {inquiry.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(inquiry.created_at).toLocaleString()}
                  </Typography>
                </Stack>
                <Typography color="text.secondary">
                  {inquiry.full_name} | {inquiry.email}
                </Typography>
                <Typography>{inquiry.message}</Typography>
                <Box>
                  <Button
                    type="button"
                    variant="outlined"
                    color="success"
                    onClick={() => handleSolveInquiry(inquiry.id)}
                    disabled={resolvingInquiryId === inquiry.id}
                  >
                    {resolvingInquiryId === inquiry.id ? "Solving..." : "Solve"}
                  </Button>
                </Box>
              </Stack>
            </Paper>
          ))}

          {!inquiries.length ? (
            <Typography color="text.secondary">No queries have been sent yet.</Typography>
          ) : null}
        </Stack>
      </Paper>
    </Stack>
  );
}
