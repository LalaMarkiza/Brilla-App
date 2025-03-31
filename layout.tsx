"use client";

import { AuthProvider } from '@/lib/auth';
import { SubscriptionProvider } from '@/lib/subscription';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <title>BRILLA - Plateforme de bien-être révolutionnaire</title>
        <meta name="description" content="BRILLA - Une approche holistique et personnalisée pour votre bien-être" />
      </head>
      <body>
        <AuthProvider>
          <SubscriptionProvider>
            {children}
          </SubscriptionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
