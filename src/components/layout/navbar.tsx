'use client';

import Link from 'next/link';
import { Menu, Package2, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { categories } from '@/lib/data';
import { CartIcon } from '@/components/cart/cart-icon';
import { Logo } from '../logo';
import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    {
      label: 'Collections',
      isDropdown: true,
      items: categories.map(cat => ({ href: `/collections/${cat.slug}`, label: cat.name })),
    },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Strapy Africa</span>
              </Link>
              {navLinks.map(link =>
                link.isDropdown && link.items ? (
                  <div key={link.label} className="grid gap-2">
                    <p className="text-muted-foreground px-2">{link.label}</p>
                    {link.items.map(item => (
                       <Link key={item.href} href={item.href} className="ml-4 flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        {item.label}
                       </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={link.href} href={link.href!} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>
        
        {/* Desktop Nav */}
        <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ml-auto">
          {navLinks.map(link =>
            link.isDropdown && link.items ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="link" className="text-base px-0 text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.items.map(item => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link key={link.href} href={link.href!} className="text-muted-foreground transition-colors hover:text-foreground text-base">
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="flex w-full items-center justify-end gap-2 md:w-auto">
          <CartIcon />
          {isAuthenticated && user ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.name} /> : null}
                      <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          ) : (
             <div className="hidden sm:flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
