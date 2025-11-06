'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Heart, Settings } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return (
      <div className="container flex items-center justify-center py-20">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Welcome, {user.name}!</h1>
        <p className="text-muted-foreground mt-2">Here's a quick overview of your account.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Order History</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">No Orders Yet</div>
            <p className="text-xs text-muted-foreground">Your past orders will appear here.</p>
            <Link href="/" className="text-sm font-medium text-primary hover:underline mt-4 inline-block">
              Start Shopping
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Empty Wishlist</div>
            <p className="text-xs text-muted-foreground">You haven't saved any items.</p>
             <Link href="/" className="text-sm font-medium text-primary hover:underline mt-4 inline-block">
              Browse Products
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Account Settings</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">Profile</div>
            <p className="text-xs text-muted-foreground">View or edit your details.</p>
             <Link href="/profile" className="text-sm font-medium text-primary hover:underline mt-4 inline-block">
              Go to Profile
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
