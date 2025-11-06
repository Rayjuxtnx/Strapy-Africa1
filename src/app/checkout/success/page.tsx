import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
    return (
        <div className="container flex items-center justify-center py-20 md:py-32">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                        <CheckCircle className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="mt-4 text-3xl font-headline">Order Confirmed!</CardTitle>
                    <CardDescription>Thank you for your purchase.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Your order has been placed successfully. You will receive an email confirmation shortly with your order details.
                    </p>
                    <Button asChild className="mt-8" size="lg">
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
