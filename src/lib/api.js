const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const ADMIN_TOKEN_KEY = "shield_admin_token";

function buildUrl(path) {
  if (/^(https?:\/\/|blob:|data:)/i.test(path)) {
    return path;
  }

  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}

export function getMediaUrl(path) {
  if (!path) {
    return "";
  }

  return buildUrl(path);
}

async function parseError(response) {
  try {
    const data = await response.json();
    if (typeof data?.detail === "string" && data.detail) {
      return data.detail;
    }

     if (typeof data?.non_field_errors?.[0] === "string") {
      return data.non_field_errors[0];
    }

    if (data && typeof data === "object") {
      const firstValue = Object.values(data)[0];

      if (typeof firstValue === "string" && firstValue) {
        return firstValue;
      }

      if (Array.isArray(firstValue) && typeof firstValue[0] === "string") {
        return firstValue[0];
      }
    }
  } catch {
    // Ignore invalid JSON and fall back to a generic message.
  }

  return `Request failed with status ${response.status}`;
}

async function request(path) {
  const response = await fetch(buildUrl(path));

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}

export function getProducts() {
  return request("/api/products/");
}

export function getProduct(slug) {
  return request(`/api/products/${slug}/`);
}

export function createInquiry(payload) {
  return authorizedRequest("/api/inquiries/", {
    method: "POST",
    body: payload,
  });
}

function getAuthHeaders(token) {
  return token
    ? {
        Authorization: `Token ${token}`,
      }
    : {};
}

function buildProductFormData(product) {
  const formData = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      if (key === "customization_option") {
        formData.append(key, "");
      }
      return;
    }

    if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
      return;
    }

    formData.append(key, value);
  });

  return formData;
}

async function authorizedRequest(path, { method = "GET", token, body, isMultipart = false } = {}) {
  const response = await fetch(buildUrl(path), {
    method,
    headers: {
      ...getAuthHeaders(token),
      ...(isMultipart ? {} : body ? { "Content-Type": "application/json" } : {}),
    },
    body: isMultipart ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getStoredAdminToken() {
  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function storeAdminToken(token) {
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearStoredAdminToken() {
  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function adminLogin(credentials) {
  return authorizedRequest("/api/admin/auth/login/", {
    method: "POST",
    body: credentials,
  });
}

export function getAdminProfile(token) {
  return authorizedRequest("/api/admin/auth/me/", { token });
}

export function getAdminProducts(token) {
  return authorizedRequest("/api/admin/products/", { token });
}

export function getAdminInquiries(token) {
  return authorizedRequest("/api/admin/inquiries/", { token });
}

export function deleteAdminInquiry(token, id) {
  return authorizedRequest(`/api/admin/inquiries/${id}/`, {
    method: "DELETE",
    token,
  });
}

export function createAdminProduct(token, product) {
  return authorizedRequest("/api/admin/products/", {
    method: "POST",
    token,
    body: buildProductFormData(product),
    isMultipart: true,
  });
}

export function updateAdminProduct(token, id, product) {
  return authorizedRequest(`/api/admin/products/${id}/`, {
    method: "PATCH",
    token,
    body: buildProductFormData(product),
    isMultipart: true,
  });
}

export function deleteAdminProduct(token, id) {
  return authorizedRequest(`/api/admin/products/${id}/`, {
    method: "DELETE",
    token,
  });
}
