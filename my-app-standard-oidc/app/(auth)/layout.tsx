'use client'

import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";

const oidcConfig: AuthProviderProps = {
  authority: "https://he1vmd.logto.app/oidc",
  client_id: "y4h2zdfs4mvi2c93j99c1",
  redirect_uri: "http://localhost:3003/callback",
  post_logout_redirect_uri: "http://localhost:3003",
  response_type: "code",
  scope: "openid profile email offline_access read:order delete:order",
  resource: ["https://order"],
  extraTokenParams: {
    resource: "https://order",
  },
  userStore: typeof window !== "undefined"
    ? new WebStorageStateStore({ store: window.localStorage })
    : undefined,
};

// adAVAQ_t

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
