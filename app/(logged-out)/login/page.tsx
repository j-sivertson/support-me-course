"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PersonStandingIcon } from "lucide-react";

export default function LoginPage(){
    return (
        <>
            <PersonStandingIcon size={50}/>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to your SupportMe account</CardDescription>
                </CardHeader>
                    <CardContent>login form</CardContent>
                    <CardFooter className="justify-between">
                        <small>Don't have an account?</small>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </CardFooter>
            </Card>
        </>
    );
}