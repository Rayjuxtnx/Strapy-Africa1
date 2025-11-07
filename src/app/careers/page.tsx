import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Careers",
    description: "Join the team at Curated Finds and help us shape the future of curated online retail.",
};

export default function CareersPage() {
    return (
        <div className="container py-12 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Join Our Team</h1>
                <p className="mt-4 text-muted-foreground">
                    At Curated Finds, we are passionate about bringing unique, high-quality products to our customers. We are a team of creatives, innovators, and problem-solvers. If you are driven by passion and excellence, we would love to hear from you.
                </p>
            </div>

            <div className="mt-16">
                <Card>
                    <CardHeader>
                        <CardTitle>Open Positions</CardTitle>
                        <CardDescription>
                            We are always looking for talented individuals to join our growing team.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg p-8 text-center">
                            <h3 className="text-xl font-semibold">No Openings... For Now!</h3>
                            <p className="text-muted-foreground mt-2">
                                There are currently no open positions, but we're growing fast! If you believe you have what it takes to be a part of our team, we'd love to see your resume.
                            </p>
                            <Button asChild className="mt-6">
                                <a href="mailto:careers@curatedfinds.com">
                                    Send Us Your Resume
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
