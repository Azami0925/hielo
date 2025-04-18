"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SalesPage() {
  const [bagsSold, setBagsSold] = useState(0);
  const [salesHistory, setSalesHistory] = useState<number[]>([]);

  const bagPrice = 8; // Price per bag
  const rollPrice = 200; // Price of a bag roll
  const waterPrice = 24; // Price of a water bottle

  const handleRecordSale = () => {
    setSalesHistory([...salesHistory, bagsSold]);
    // You would typically send this data to a database here
    console.log(`${bagsSold} bolsas de hielo vendidas`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registrar Ventas de Bolsas de Hielo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="bagsSold" className="text-right inline-block w-24">
                Bolsas Vendidas:
              </label>
              <Input
                type="number"
                id="bagsSold"
                value={bagsSold}
                onChange={(e) => setBagsSold(parseInt(e.target.value))}
                placeholder="Ingrese número de bolsas"
              />
            </div>
            <Button onClick={handleRecordSale}>Registrar Venta</Button>

            <div className="mt-4">
              <h3>Historial de Ventas:</h3>
              <ul>
                {salesHistory.map((sale, index) => (
                  <li key={index}>Venta {index + 1}: {sale} bolsas</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <Link href="/">
        <Button variant="secondary">Regresar</Button>
      </Link>
    </div>
  );
}

