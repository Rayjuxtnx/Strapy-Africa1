'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import type { Order } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Printer } from 'lucide-react';

export default function ReceiptPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;

  useEffect(() => {
    if (orderId) {
      try {
        const storedOrder = localStorage.getItem(orderId);
        if (storedOrder) {
          const parsedOrder = JSON.parse(storedOrder);
          setOrder(parsedOrder);
        } else {
          // If no order is found, maybe redirect to an error page or home
          router.push('/');
        }
      } catch (error) {
        console.error("Failed to parse order from localStorage", error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    }
  }, [orderId, router]);

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center py-20">
        <p>Loading your receipt...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container flex items-center justify-center py-20 text-center">
        <div>
          <h2 className="text-2xl font-bold">Receipt Not Found</h2>
          <p className="text-muted-foreground mt-2">
            We couldn't find the details for this order.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };
  
  const paymentMethodLabels = {
    card: 'Credit/Debit Card',
    mpesa: 'M-Pesa',
    paypal: 'PayPal',
  };

  return (
    <div className="container py-12 md:py-24 max-w-4xl mx-auto">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible;
          }
          #printable-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
      <Card id="printable-receipt" className="shadow-2xl">
        <CardHeader className="bg-secondary/30 p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                    <Logo />
                    <CardDescription className="mt-2">Thank you for your order!</CardDescription>
                </div>
                 <div className="text-left sm:text-right">
                    <CardTitle className="text-4xl font-headline">Receipt</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Order #{order.id.split('_')[1]}</p>
                 </div>
            </div>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold mb-2">Billed To</h3>
                    <div className="text-muted-foreground text-sm space-y-1">
                        <p>{order.customer.name}</p>
                        <p>{order.customer.address}</p>
                        <p>{order.customer.email}</p>
                        <p>{order.customer.phone}</p>
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2 text-left sm:text-right">Order Details</h3>
                    <div className="text-muted-foreground text-sm space-y-1 text-left sm:text-right">
                        <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Payment Method:</strong> {paymentMethodLabels[order.paymentMethod]}</p>
                    </div>
                </div>
            </div>

            <div>
                 <h3 className="font-semibold mb-4">Order Summary</h3>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[60%]">Item</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.items.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <p className="font-medium">{item.product.name}</p>
                                    {item.selectedOptions && (
                                    <p className="text-xs text-muted-foreground">
                                        {Object.entries(item.selectedOptions).map(([key, value]) => `${key}: ${value}`).join(' / ')}
                                    </p>
                                    )}
                                </TableCell>
                                <TableCell className="text-center">{item.quantity}</TableCell>
                                <TableCell className="text-right">{formatPrice(item.product.price)}</TableCell>
                                <TableCell className="text-right font-medium">{formatPrice(item.product.price * item.quantity)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 </Table>
            </div>

            <div className="flex justify-end">
                <div className="w-full max-w-sm space-y-4">
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Grand Total</span>
                        <span>{formatPrice(order.total)}</span>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-muted-foreground pt-8">
                <p>Thank you for shopping with Strapy Africa. If you have any questions, please contact support@strapy.africa.</p>
            </div>
        </CardContent>
      </Card>
      <CardFooter className="p-8 border-t justify-center gap-4 no-print">
         <Button asChild variant="outline">
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
          </Button>
      </CardFooter>
    </div>
  );
}
