import { Twitter, Instagram, Facebook } from 'lucide-react';
import { Logo } from '../logo';
import Link from 'next/link';
import { Button } from '../ui/button';

export function Footer() {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const footerLinks = [
    { title: 'Shop', links: [ {label: 'Fashion', href: '/collections/fashion'}, {label: 'Home Goods', href: '/collections/home-goods'}, {label: 'Accessories', href: '/collections/accessories'} ]},
    { title: 'About', links: [ {label: 'Our Story', href: '#'}, {label: 'Careers', href: '#'} ]},
    { title: 'Support', links: [ {label: 'Contact Us', href: '/contact'}, {label: 'FAQs', href: '/contact'}, {label: 'Returns', href: '#'} ]},
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm max-w-sm">
              Your premier destination for curated collections of fashion, home goods, and accessories.
            </p>
          </div>

          {footerLinks.map(section => (
            <div key={section.title}>
              <h3 className="font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Curated Finds. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map(social => (
              <Button key={social.label} variant="ghost" size="icon" asChild>
                <a href={social.href} aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
