
'use client'
import "./globals.css";

import { LogtoProvider, LogtoConfig } from '@logto/react';

const config: LogtoConfig = {
  endpoint: 'http://localhost:30080/',
  appId: '9qg0uijsqtb7h5gxw085u',
  resources: ['https://order.com'],
  scopes: ['openid', 'profile', 'email', 'offline_access', 'add:order', 'delete:order']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LogtoProvider config={config}>
          {children}
        </LogtoProvider>
      </body>
    </html>
  );
}
