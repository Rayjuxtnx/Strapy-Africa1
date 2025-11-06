'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(10, 'Phone number seems too short.'),
  address: z.string().min(5, 'Address must be at least 5 characters.'),
  paymentMethod: z.enum(['mpesa', 'airtel', 'card'], {
    required_error: 'You need to select a payment method.',
  }),
});

export function CheckoutForm() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      paymentMethod: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.billingAddress || '',
        paymentMethod: form.getValues('paymentMethod'),
      });
    }
  }, [user, form]);

  async function handleMpesaPayment(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(cartTotal), // M-Pesa requires an integer
          phone: values.phone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'M-Pesa payment failed.');
      }
      
      toast({
        title: 'STK Push Sent',
        description: 'Please check your phone to complete the M-Pesa payment.',
      });
      
      // Usually, you'd wait for a webhook confirmation before clearing cart and redirecting.
      // For this example, we'll proceed optimistically.
      clearCart();
      router.push('/checkout/success');

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: error.message || 'An unexpected error occurred with M-Pesa.',
      });
    } finally {
      setIsLoading(false);
    }
  }


  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.paymentMethod === 'mpesa') {
        handleMpesaPayment(values);
    } else {
        // Handle other payment methods
        console.log('Order submitted with non-Mpesa payment:', values);
        toast({
        title: 'Order Placed!',
        description: 'Thank you for your purchase. Your order is being processed.',
        });
        clearCart();
        router.push('/checkout/success');
    }
  }
  
  if (cartItems.length === 0 && !isLoading) {
    return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground mt-2">You can't check out with an empty cart.</p>
            <Button asChild className="mt-4" onClick={() => router.push('/')}>
                <a href="/">Continue Shopping</a>
            </Button>
        </div>
    );
  }


  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <h2 className="font-headline text-2xl font-bold mb-6">Shipping Information</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jane.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+254 712 345 678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Moi Avenue, Nairobi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                      disabled={isLoading}
                    >
                      {[
                        { value: 'mpesa', label: 'M-Pesa' },
                        { value: 'airtel', label: 'Airtel Money' },
                        { value: 'card', label: 'Credit/Debit Card' },
                      ].map(option => (
                        <FormItem key={option.value} className="flex items-center space-x-3 space-y-0 p-4 border rounded-md has-[[data-state=checked]]:border-primary">
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal w-full">{option.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Processing...' : `Place Order - ${formatPrice(cartTotal)}`}
            </Button>
          </form>
        </Form>
      </div>

      <div className="md:col-span-1">
        <Card className="bg-secondary/50">
            <CardHeader>
                <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {cartItems.map(item => {
                        const productImage = PlaceHolderImages.find(img => img.id === item.product.images[0]);
                        return (
                            <li key={item.id} className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                  {productImage && <Image src={productImage.imageUrl} alt={item.product.name} fill className="object-cover" data-ai-hint={productImage.imageHint} />}
                                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{item.quantity}</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {Object.values(item.selectedOptions || {}).join(' / ')}
                                    </p>
                                </div>
                                <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                            </li>
                        )
                    })}
                </ul>
                <Separator className="my-6" />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatPrice(cartTotal)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
