"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PurchasesPage() {
  const [bagRollsPurchased, setBagRollsPurchased] = useState(0);
  const [waterBottlesPurchased, setWaterBottlesPurchased] = useState(0);
  const [purchasesHistory, setPurchasesHistory] = useState<
    { bagRolls: number; waterBottles: number }[]
  >([]);

  const handleRecordPurchase = () => {
    setPurchasesHistory([
      ...purchasesHistory,
      { bagRolls: bagRollsPurchased, waterBottles: waterBottlesPurchased },
    ]);
    // You would typically send this data to a database here
    console.log(
      `Compró ${bagRollsPurchased} rollos de bolsas y ${waterBottlesPurchased} botellas de agua`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registrar Compras de Materia Prima</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="bagRolls" className="text-right inline-block w-32">
                Rollos de Bolsas Comprados:
              </label>
              <Input
                type="number"
                id="bagRolls"
                value={bagRollsPurchased}
                onChange={(e) => setBagRollsPurchased(parseInt(e.target.value))}
                placeholder="Ingrese número de rollos de bolsas"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="waterBottles"
                className="text-right inline-block w-32"
              >
                Botellas de Agua Compradas:
              </label>
              <Input
                type="number"
                id="waterBottles"
                value={waterBottlesPurchased}
                onChange={(e) => setWaterBottlesPurchased(
                  parseInt(e.target.value)
                )}
                placeholder="Ingrese número de botellas de agua"
              />
            </div>

            <Button onClick={handleRecordPurchase}>Registrar Compra</Button>

            <div className="mt-4">
              <h3>Historial de Compras:</h3>
              <ul>
                {purchasesHistory.map((purchase, index) => (
                  <li key={index}>
                    Compra {index + 1}: {purchase.bagRolls} rollos de bolsas,{" "}
                    {purchase.waterBottles} botellas de agua
                  </li>
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

