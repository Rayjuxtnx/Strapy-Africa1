import { Chatbot } from "@/components/chatbot";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
    title: "Contact Us",
    description: "Get in touch with Curated Finds or chat with our AI assistant.",
};

export default function ContactPage() {
    return (
        <div className="container py-12 md:py-24">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Contact Us</h1>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Have questions? We're here to help. You can reach out to us through the channels below, or get instant answers from our AI assistant.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
                <div className="flex flex-col items-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <Mail className="h-8 w-8 text-primary"/>
                    </div>
                    <h3 className="font-bold text-lg mt-4">Email</h3>
                    <p className="text-muted-foreground">support@curatedfinds.com</p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="p-4 bg-primary/10 rounded-full">
                        <Phone className="h-8 w-8 text-primary"/>
                    </div>
                    <h3 className="font-bold text-lg mt-4">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="p-4 bg-primary/10 rounded-full">
                        <MapPin className="h-8 w-8 text-primary"/>
                    </div>
                    <h3 className="font-bold text-lg mt-4">Address</h3>
                    <p className="text-muted-foreground">123 Curated Way, Style City, 10101</p>
                </div>
            </div>

            <div className="mt-24">
                <Chatbot />
            </div>
        </div>
    );
}
