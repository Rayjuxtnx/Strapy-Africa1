'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, Home, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { User as UserType } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [phone, setPhone] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setPhone(user.phone || '');
      setBillingAddress(user.billingAddress || '');
      setAvatarUrl(user.avatarUrl || '');
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
    const updatedUser: UserType = { 
        ...user, 
        phone,
        billingAddress,
        avatarUrl
    };
    if (updateUser(updatedUser)) {
      setIsEditing(false);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setPhone(user.phone || '');
    setBillingAddress(user.billingAddress || '');
    setAvatarUrl(user.avatarUrl || '');
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container py-12 md:py-24">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {avatarUrl ? <AvatarImage src={avatarUrl} alt={user.name} /> : null}
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

            {isEditing ? (
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <Label htmlFor="avatar-upload">Profile Picture</Label>
                  <div className="flex items-center gap-4 mt-1">
                      <Avatar className="h-12 w-12">
                          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
                          <AvatarFallback>
                              <User />
                          </AvatarFallback>
                      </Avatar>
                      <Input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                      />
                      <Button asChild variant="outline">
                          <label htmlFor="avatar-upload" className="cursor-pointer">
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Image
                          </label>
                      </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +254 712 345 678"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <Textarea
                    id="billingAddress"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    placeholder="e.g. 123 Moi Avenue, Nairobi"
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
                <>
                    {user.phone && <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{user.phone}</span>
                    </div>}
                     {user.billingAddress && <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
                      <Home className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">Billing Address:</span>
                      <span className="font-medium">{user.billingAddress}</span>
                    </div>}
                </>
            )}

             <div className="flex gap-2">
                {isEditing ? (
                    <>
                        <Button onClick={handleSave}>Save Changes</Button>
                        <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
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
