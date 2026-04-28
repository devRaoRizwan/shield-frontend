import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  adminLogin,
  clearStoredAdminToken,
  getAdminProfile,
  getStoredAdminToken,
  storeAdminToken,
} from "../lib/api";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredAdminToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      if (!token) {
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        const profile = await getAdminProfile(token);
        if (isMounted) {
          setUser(profile);
        }
      } catch {
        clearStoredAdminToken();
        if (isMounted) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      loading,
      async login(credentials) {
        const data = await adminLogin(credentials);
        storeAdminToken(data.token);
        setToken(data.token);
        setUser(data.user);
        return data.user;
      },
      logout() {
        clearStoredAdminToken();
        setToken(null);
        setUser(null);
      },
    }),
    [loading, token, user]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const value = useContext(AdminAuthContext);

  if (!value) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider.");
  }

  return value;
}
