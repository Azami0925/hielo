"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Purchase {
    bagRolls: number;
    waterBottles: number;
}

export default function PurchasesPage() {
  const [bagRollsPurchased, setBagRollsPurchased] = useState(0);
  const [waterBottlesPurchased, setWaterBottlesPurchased] = useState(0);
  const [purchasesHistory, setPurchasesHistory] = useState<Purchase[]>([]);

  useEffect(() => {
    // Cargar el historial de compras desde el almacenamiento local al montar el componente
    const storedHistory = localStorage.getItem("purchasesHistory");
    if (storedHistory) {
      try {
          const parsedHistory = JSON.parse(storedHistory);
          // Basic validation to ensure it's an array of expected objects
          if (Array.isArray(parsedHistory) && parsedHistory.every(item => typeof item === 'object' && 'bagRolls' in item && 'waterBottles' in item)) {
            setPurchasesHistory(parsedHistory);
          } else {
              console.error("Invalid purchase history format found in localStorage.");
              localStorage.removeItem("purchasesHistory"); // Clear invalid data
          }
      } catch (error) {
          console.error("Failed to parse purchase history from localStorage:", error);
          localStorage.removeItem("purchasesHistory"); // Clear corrupted data
      }
    }
  }, []);

  useEffect(() => {
    // Guardar el historial de compras en el almacenamiento local cada vez que cambie
    localStorage.setItem("purchasesHistory", JSON.stringify(purchasesHistory));
  }, [purchasesHistory]);


  const handleRecordPurchase = () => {
    const rolls = bagRollsPurchased > 0 ? bagRollsPurchased : 0;
    const bottles = waterBottlesPurchased > 0 ? waterBottlesPurchased : 0;

    if (rolls > 0 || bottles > 0) {
        const newPurchase: Purchase = { bagRolls: rolls, waterBottles: bottles };
        setPurchasesHistory([...purchasesHistory, newPurchase]);
        console.log(
          `Compró ${rolls} rollos de bolsas y ${bottles} botellas de agua`
        );
        // Reset input fields
        setBagRollsPurchased(0);
        setWaterBottlesPurchased(0);
    } else {
        console.log("Ingrese una cantidad válida para rollos o botellas.");
         // Optionally, show a user-friendly message here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 relative z-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registrar Compras de Materia Prima</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2 items-center grid-cols-[auto_1fr]">
              <label htmlFor="bagRolls" className="text-right">
                Rollos de Bolsas:
              </label>
              <Input
                type="number"
                id="bagRolls"
                value={bagRollsPurchased === 0 ? "" : bagRollsPurchased}
                onChange={(e) => setBagRollsPurchased(parseInt(e.target.value) || 0)}
                placeholder="Cantidad"
                min="0"
              />
            </div>

            <div className="grid gap-2 items-center grid-cols-[auto_1fr]">
              <label
                htmlFor="waterBottles"
                className="text-right"
              >
                Botellas de Agua:
              </label>
              <Input
                type="number"
                id="waterBottles"
                value={waterBottlesPurchased === 0 ? "" : waterBottlesPurchased}
                onChange={(e) => setWaterBottlesPurchased(
                  parseInt(e.target.value) || 0
                )}
                placeholder="Cantidad"
                min="0"
              />
            </div>

            <Button onClick={handleRecordPurchase}>Registrar Compra</Button>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Historial de Compras:</h3>
               {purchasesHistory.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 max-h-48 overflow-y-auto">
                    {purchasesHistory.map((purchase, index) => (
                      <li key={index}>
                        Compra {index + 1}: {purchase.bagRolls} rollos, {purchase.waterBottles} botellas
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No hay compras registradas.</p>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Link href="/" className="mt-4">
        <Button variant="secondary">Regresar</Button>
      </Link>
    </div>
  );
}
