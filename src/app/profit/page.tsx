"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfitPage() {
  const [bagsSold, setBagsSold] = useState(0);
  const [bagRollsPurchased, setBagRollsPurchased] = useState(0);
  const [waterBottlesPurchased, setWaterBottlesPurchased] = useState(0);

  const bagPrice = 8; // Precio por bolsa
  const rollPrice = 200; // Precio por rollo de bolsas
  const waterPrice = 24; // Precio por botella de agua

  useEffect(() => {
    // Obtener el historial de ventas del almacenamiento local
    const salesHistory = localStorage.getItem("salesHistory");
    const salesData = salesHistory ? JSON.parse(salesHistory) : [];
    const totalBagsSold = salesData.reduce((sum:number, sale:number) => sum + sale, 0);
    setBagsSold(totalBagsSold);

    // Obtener el historial de compras del almacenamiento local
    const purchasesHistory = localStorage.getItem("purchasesHistory");
    const purchasesData = purchasesHistory ? JSON.parse(purchasesHistory) : [];
    const totalBagRolls = purchasesData.reduce((sum:number, purchase:{ bagRolls:number, waterBottles:number }) => sum + purchase.bagRolls, 0);
    const totalWaterBottles = purchasesData.reduce((sum:number, purchase:{ bagRolls:number, waterBottles:number }) => sum + purchase.waterBottles, 0);
    setBagRollsPurchased(totalBagRolls);
    setWaterBottlesPurchased(totalWaterBottles);
  }, []);

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
                readOnly // El valor se calcula automáticamente
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
                readOnly // El valor se calcula automáticamente
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
                readOnly // El valor se calcula automáticamente
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
      <Link href="/">
        <Button variant="secondary">Regresar</Button>
      </Link>
    </div>
  );
}
