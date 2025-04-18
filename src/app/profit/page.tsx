
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfitPage() {
  const [bagsSold, setBagsSold] = useState(0);
  const [bagRollsPurchased, setBagRollsPurchased] = useState(0);
  const [waterBottlesPurchased, setWaterBottlesPurchased] = useState(0);

  const bagPrice = 8; // Price per bag
  const rollPrice = 200; // Price of a bag roll
  const waterPrice = 24; // Price of a water bottle

  const calculateProfit = () => {
    const revenue = bagsSold * bagPrice;
    const expenses = bagRollsPurchased * rollPrice + waterBottlesPurchased * waterPrice;
    const profit = revenue - expenses;

    return profit;
  };

  const profit = calculateProfit();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cálculo de Ganancias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="bagsSold" className="text-right inline-block w-32">
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

            <div className="mt-4">
              <h3>Ganancia:</h3>
              <p>${profit}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

