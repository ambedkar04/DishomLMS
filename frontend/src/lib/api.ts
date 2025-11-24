// Lightweight API client used across the app

type Json = any;

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL ?? "";

async function request<T = unknown>(path: string, init: RequestInit = {}): Promise<{ data?: T; error?: Json }> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
      ...init,
    });

    const isJson = res.headers.get("content-type")?.includes("application/json");
    const body = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      return { error: body as Json };
    }

    return { data: body as T };
  } catch (e) {
    return { error: "Network error" };
  }
}

function getAccessToken(): string | undefined {
  try {
    const raw = localStorage.getItem("authTokens");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    // Support either { access, refresh } or any token shape with 'access'
    return parsed?.access ?? parsed?.token ?? undefined;
  } catch {
    return undefined;
  }
}

export async function loginUser(payload: { mobile_number: string; password: string }) {
  // Backend returns { access, refresh } via SimpleJWT
  return request<{ access: string; refresh: string }>(
    "/api/accounts/login/",
    { method: "POST", body: JSON.stringify(payload) }
  );
}

export async function registerUser(payload: { full_name: string; mobile_number: string; password: string }) {
  // Backend RegisterView returns { tokens: {refresh, access}, user }
  return request<{ tokens: { access: string; refresh: string }; user: Record<string, unknown> }>(
    "/api/accounts/register/",
    { method: "POST", body: JSON.stringify(payload) }
  );
}

export function storeAuthData(tokens: unknown, user: unknown) {
  try {
    localStorage.setItem("authTokens", JSON.stringify(tokens));
    localStorage.setItem("authUser", JSON.stringify(user));
  } catch {
    // ignore storage errors
  }
}

export function logoutUser() {
  try {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("authUser");
  } finally {
    // simple redirect back to login
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
}

export async function fetchCurrentUser() {
  const token = getAccessToken();
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await request<Record<string, unknown>>("/api/accounts/me/", { headers });
  if (res.data) return res.data;
  throw new Error("Failed to fetch current user");
}

export async function updateUserProfile(payload: Record<string, unknown>) {
  const token = getAccessToken();
  const headers: HeadersInit = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return request<Record<string, unknown>>("/user/profile/", {
    method: "PUT",
    headers,
    body: JSON.stringify(payload),
  });
}

export async function requestPasswordReset(payload: { email: string }) {
  // Attempt to call backend; if not implemented yet, return a friendly error
  const res = await request<{ detail?: string; message?: string }>(
    "/api/accounts/password/reset/",
    { method: "POST", body: JSON.stringify(payload) }
  );
  return res;
}
