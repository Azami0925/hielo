"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Added CardDescription
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input"; // Ensure Input is imported

interface Sale {
  // Assuming sales history stores numbers directly based on sales/page.tsx
  amount: number;
}

interface Purchase {
  bagRolls: number;
  waterBottles: number;
}

export default function ProfitPage() {
  const [totalBagsSold, setTotalBagsSold] = useState(0);
  const [totalBagRollsPurchased, setTotalBagRollsPurchased] = useState(0);
  const [totalWaterBottlesPurchased, setTotalWaterBottlesPurchased] = useState(0);
  const [profit, setProfit] = useState(0);

  const bagPrice = 8; // Precio por bolsa
  const rollPrice = 200; // Precio por rollo de bolsas
  const waterPrice = 24; // Precio por botella de agua

  useEffect(() => {
    // --- Calculate Total Sales ---
    const salesHistoryRaw = localStorage.getItem("salesHistory");
    let currentTotalBagsSold = 0;
    if (salesHistoryRaw) {
        try {
            const salesData: number[] = JSON.parse(salesHistoryRaw);
            // Ensure it's an array of numbers
            if (Array.isArray(salesData) && salesData.every(item => typeof item === 'number')) {
                currentTotalBagsSold = salesData.reduce((sum, sale) => sum + sale, 0);
            } else {
                console.error("Invalid sales history format in localStorage.");
                localStorage.removeItem("salesHistory"); // Clear invalid data
            }
        } catch (error) {
            console.error("Failed to parse sales history from localStorage:", error);
            localStorage.removeItem("salesHistory"); // Clear corrupted data
        }
    }
    setTotalBagsSold(currentTotalBagsSold);

    // --- Calculate Total Purchases ---
    const purchasesHistoryRaw = localStorage.getItem("purchasesHistory");
    let currentTotalBagRolls = 0;
    let currentTotalWaterBottles = 0;
    if (purchasesHistoryRaw) {
      try {
        const purchasesData: Purchase[] = JSON.parse(purchasesHistoryRaw);
         if (Array.isArray(purchasesData) && purchasesData.every(item => typeof item === 'object' && 'bagRolls' in item && 'waterBottles' in item)) {
             currentTotalBagRolls = purchasesData.reduce((sum, purchase) => sum + purchase.bagRolls, 0);
             currentTotalWaterBottles = purchasesData.reduce((sum, purchase) => sum + purchase.waterBottles, 0);
         } else {
             console.error("Invalid purchase history format in localStorage.");
             localStorage.removeItem("purchasesHistory"); // Clear invalid data
         }
      } catch (error) {
          console.error("Failed to parse purchase history from localStorage:", error);
          localStorage.removeItem("purchasesHistory"); // Clear corrupted data
      }
    }
    setTotalBagRollsPurchased(currentTotalBagRolls);
    setTotalWaterBottlesPurchased(currentTotalWaterBottles);

    // --- Calculate Profit ---
    const revenue = currentTotalBagsSold * bagPrice;
    const expenses = currentTotalBagRolls * rollPrice + currentTotalWaterBottles * waterPrice;
    setProfit(revenue - expenses);

  }, []); // Empty dependency array ensures this runs once on mount

  // Function to format currency (optional but good practice)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 relative z-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cálculo de Ganancias</CardTitle>
           <CardDescription>Resumen basado en ventas y compras registradas.</CardDescription> {/* Added description */}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Use grid for alignment */}
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <label htmlFor="bagsSold" className="text-right font-medium">
                Bolsas Vendidas:
              </label>
              {/* Use a styled div instead of Input for display */}
               <div id="bagsSold" className="p-2 border rounded-md bg-muted text-right">
                 {totalBagsSold}
               </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <label htmlFor="bagRolls" className="text-right font-medium">
                Rollos Comprados:
              </label>
               <div id="bagRolls" className="p-2 border rounded-md bg-muted text-right">
                 {totalBagRollsPurchased}
               </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <label
                htmlFor="waterBottles"
                className="text-right font-medium"
              >
                Agua Comprada:
              </label>
               <div id="waterBottles" className="p-2 border rounded-md bg-muted text-right">
                 {totalWaterBottlesPurchased}
               </div>
            </div>

            {/* Display calculated values */}
             <div className="mt-4 border-t pt-4 grid gap-2">
                 <div className="flex justify-between items-center">
                    <span className="font-medium">Ingresos Totales:</span>
                    <span className="font-semibold">{formatCurrency(totalBagsSold * bagPrice)}</span>
                 </div>
                 <div className="flex justify-between items-center">
                     <span className="font-medium">Gastos Totales:</span>
                     <span className="font-semibold">{formatCurrency(totalBagRollsPurchased * rollPrice + totalWaterBottlesPurchased * waterPrice)}</span>
                 </div>
                 <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span className="text-lg font-bold">Ganancia Neta:</span>
                    <span className={`text-lg font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(profit)}
                    </span>
                 </div>
             </div>

          </div>
        </CardContent>
      </Card>
      <Link href="/" className="mt-4"> {/* Add margin */}
        <Button variant="secondary">Regresar</Button>
      </Link>
    </div>
  );
}
