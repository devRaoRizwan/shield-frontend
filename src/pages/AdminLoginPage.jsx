import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, login } = useAdminAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/admin";

  if (!loading && isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box sx={{maxWidth: 520, mx: "auto", py: { xs: 4, md: 7 } }}>
      <Paper sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <LockOutlinedIcon color="primary" />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Admin Login
              </Typography>
            </Stack>
            <Typography color="text.secondary">
              Sign in to manage products inside the site.
            </Typography>
          </Stack>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <TextField
            label="Username"
            value={form.username}
            onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            fullWidth
            required
          />

          <Button type="submit" variant="contained" size="large" disabled={submitting}>
            {submitting ? "Signing In..." : "Sign In"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
