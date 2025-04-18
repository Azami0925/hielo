
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
              <CardTitle>Registrar Ventas</CardTitle>
              <CardDescription>Registrar las ventas de bolsas de hielo.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Ingrese el número de bolsas de hielo vendidas.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/purchases">
          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle>Registrar Compras</CardTitle>
              <CardDescription>Registrar las compras de materia prima.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Registre la compra de rollos de bolsas de hielo y agua.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profit">
          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle>Cálculo de Ganancias</CardTitle>
              <CardDescription>Calcular los márgenes de ganancia.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Calcular la ganancia en base a las ventas y los gastos.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

