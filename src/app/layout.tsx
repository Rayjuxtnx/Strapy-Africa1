'use client';

import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Preloader } from '@/components/layout/preloader';

function ActivityTracker() {
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      const key = `activity_${user.id}`;
      const now = new Date();
      const newActivity = {
        type: 'pageView',
        path: pathname,
        timestamp: now.toISOString(),
      };

      try {
        const storedActivity = localStorage.getItem(key);
        const activities = storedActivity ? JSON.parse(storedActivity) : [];
        
        // Keep last 100 activities to avoid excessive storage usage
        const updatedActivities = [...activities, newActivity].slice(-100);

        localStorage.setItem(key, JSON.stringify(updatedActivities));
      } catch (error) {
        console.error("Could not write activity to localStorage", error);
      }
    }
  }, [pathname, user]);

  return null;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Curated Finds</title>
        <meta name="description" content="Your premier destination for curated collections of fashion, home goods, and accessories." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background flex flex-col")}>
        <AuthProvider>
          <CartProvider>
            {isHomePage && <Preloader />}
            <ActivityTracker />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
