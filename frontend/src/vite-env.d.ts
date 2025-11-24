/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_DEBUG: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_FACEBOOK_APP_ID: string;
  readonly VITE_STRIPE_PUBLIC_KEY: string;
  readonly VITE_MAX_FILE_SIZE: string;
  readonly VITE_ALLOWED_FILE_TYPES: string;
  readonly VITE_DEFAULT_THEME: string;
  readonly VITE_ENABLE_DARK_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
