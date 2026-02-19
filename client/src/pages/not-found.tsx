import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-md mx-4 bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold font-display text-white">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-white/60">
            The page you are looking for doesn't exist or has been moved.
          </p>

          <div className="mt-8">
            <Link href="/" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-white/90 transition-colors w-full">
              Return Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
