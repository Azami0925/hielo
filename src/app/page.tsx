
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-6">HieloYa</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/sales">
          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle>Record Sales</CardTitle>
              <CardDescription>Record sales of ice bags.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Enter the number of ice bags sold.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/purchases">
          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle>Record Purchases</CardTitle>
              <CardDescription>Log purchases of raw materials.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Record the purchase of ice bag rolls and water.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profit">
          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle>Profit Calculation</CardTitle>
              <CardDescription>Calculate profit margins.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Calculate profit based on sales and expenses.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
