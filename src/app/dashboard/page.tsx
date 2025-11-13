'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Settings, View } from 'lucide-react';
import Link from 'next/link';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import type { Order } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      try {
        const orderHistoryKey = `orders_${user.id}`;
        const storedOrders = localStorage.getItem(orderHistoryKey);
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        }
      } catch (error) {
        console.error("Failed to parse orders from localStorage", error);
      }
    }
  }, [user]);

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
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">You've made {orders.length} {orders.length === 1 ? 'order' : 'orders'} in total.</p>
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
      
       <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>A list of all your past purchases.</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice().reverse().map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id.split('_')[1]}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="icon">
                            <Link href={`/checkout/receipt/${order.id}`}>
                                <View className="h-4 w-4" />
                                <span className="sr-only">View Receipt</span>
                            </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">You haven't made any purchases yet.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <Card>
            <CardHeader>
                <CardTitle>Your Activity</CardTitle>
                <CardDescription>A summary of your recent activity on the site.</CardDescription>
            </CardHeader>
            <CardContent>
                <ActivityChart />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
