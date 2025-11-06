'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  return (
    <div className="container py-12 md:py-24">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
              <CardDescription>Welcome to your profile page.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
                <h3 className="font-semibold">Your Information</h3>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{user.email}</span>
                </div>
            </div>

            <div>
                 <h3 className="font-semibold mb-4">Order History</h3>
                 <div className="border rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">You have no past orders.</p>
                    <Button asChild variant="link" className="mt-2">
                        <a href="/">Start Shopping</a>
                    </Button>
                 </div>
            </div>
            
            <Button variant="outline" onClick={handleLogout} className="w-full">
                Logout
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
