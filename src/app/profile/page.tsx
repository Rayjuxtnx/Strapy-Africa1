'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { User as UserType } from '@/lib/types';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

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
  };

  const handleSave = () => {
    if (name.trim().length < 2) {
      toast({
        variant: 'destructive',
        title: 'Invalid Name',
        description: 'Name must be at least 2 characters.',
      });
      return;
    }
    const updatedUser: UserType = { ...user, name: name.trim() };
    if (updateUser(updatedUser)) {
      setIsEditing(false);
      toast({
        title: 'Profile Updated',
        description: 'Your name has been successfully updated.',
      });
    }
  };

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
              <CardTitle className="text-3xl font-headline">
                {user.name}
              </CardTitle>
              <CardDescription>Welcome to your profile page.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6">
            <h3 className="font-semibold">Your Information</h3>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                 <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{user.email}</span>
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
             <div className="flex gap-2">
                {isEditing ? (
                    <>
                        <Button onClick={handleSave}>Save Changes</Button>
                        <Button variant="ghost" onClick={() => { setIsEditing(false); setName(user.name); }}>Cancel</Button>
                    </>
                ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
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

          <Button variant="destructive" onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
