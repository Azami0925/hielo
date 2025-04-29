"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// Input is no longer needed here for display
// import { Input } from "@/components/ui/input";

// Structure for Sale History (must match sales/page.tsx)
interface SaleEntry {
  standardBags: number;
  oz32Bags: number;
  timestamp: number;
}

// Structure for Purchase History (must match purchases/page.tsx)
interface Purchase {
  bagRolls: number;
  waterBottles: number;
}

export default function ProfitPage() {
  // Sales States
  const [totalStandardBagsSold, setTotalStandardBagsSold] = useState(0);
  const [totalOz32BagsSold, setTotalOz32BagsSold] = useState(0);

  // Purchase States
  const [totalBagRollsPurchased, setTotalBagRollsPurchased] = useState(0);
  const [totalWaterBottlesPurchased, setTotalWaterBottlesPurchased] = useState(0);

  // Financial States
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [profit, setProfit] = useState(0);

  // --- Prices (Centralize these or pass as props in a larger app) ---
  const standardBagPrice = 8; // Precio por bolsa estándar
  const oz32BagPrice = 6;     // Precio por bolsa 32oz
  const rollPrice = 200;    // Precio por rollo de bolsas
  const waterPrice = 24;    // Precio por botella de agua

  useEffect(() => {
    // --- Calculate Total Sales from History ---
    const salesHistoryRaw = localStorage.getItem("salesHistory");
    let currentTotalStandardBags = 0;
    let currentTotalOz32Bags = 0;

    if (salesHistoryRaw) {
        try {
            const salesData: SaleEntry[] = JSON.parse(salesHistoryRaw);
            // Validate format
            if (Array.isArray(salesData) && salesData.every(item =>
                typeof item === 'object' && item !== null &&
                typeof item.standardBags === 'number' &&
                typeof item.oz32Bags === 'number' // timestamp check optional here
            )) {
                currentTotalStandardBags = salesData.reduce((sum, sale) => sum + sale.standardBags, 0);
                currentTotalOz32Bags = salesData.reduce((sum, sale) => sum + sale.oz32Bags, 0);
            } else {
                console.error("Invalid sales history format in localStorage.");
                localStorage.removeItem("salesHistory"); // Clear invalid data
            }
        } catch (error) {
            console.error("Failed to parse sales history from localStorage:", error);
            localStorage.removeItem("salesHistory"); // Clear corrupted data
        }
    }
    setTotalStandardBagsSold(currentTotalStandardBags);
    setTotalOz32BagsSold(currentTotalOz32Bags);

    // --- Calculate Total Purchases from History ---
    const purchasesHistoryRaw = localStorage.getItem("purchasesHistory");
    let currentTotalBagRolls = 0;
    let currentTotalWaterBottles = 0;
    if (purchasesHistoryRaw) {
      try {
        const purchasesData: Purchase[] = JSON.parse(purchasesHistoryRaw);
         if (Array.isArray(purchasesData) && purchasesData.every(item =>
             typeof item === 'object' && item !== null &&
             typeof item.bagRolls === 'number' &&
             typeof item.waterBottles === 'number'
         )) {
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

    // --- Calculate Financial Totals ---
    const calculatedRevenue = (currentTotalStandardBags * standardBagPrice) + (currentTotalOz32Bags * oz32BagPrice);
    const calculatedExpenses = (currentTotalBagRolls * rollPrice) + (currentTotalWaterBottles * waterPrice);
    const calculatedProfit = calculatedRevenue - calculatedExpenses;

    setTotalRevenue(calculatedRevenue);
    setTotalExpenses(calculatedExpenses);
    setProfit(calculatedProfit);

  }, []); // Empty dependency array ensures this runs once on mount

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 relative z-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cálculo de Ganancias</CardTitle>
           <CardDescription>Resumen basado en ventas y compras registradas.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Sales Summary */}
            <h4 className="font-semibold text-lg mt-2 border-b pb-1">Resumen de Ventas</h4>
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <label htmlFor="standardBagsSoldDisplay" className="text-right font-medium">
                Bolsas Estándar Vendidas:
              </label>
               <div id="standardBagsSoldDisplay" className="p-2 border rounded-md bg-muted text-right">
                 {totalStandardBagsSold}
               </div>
            </div>
             <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <label htmlFor="oz32BagsSoldDisplay" className="text-right font-medium">
                Bolsas 32oz Vendidas:
              </label>
               <div id="oz32BagsSoldDisplay" className="p-2 border rounded-md bg-muted text-right">
                 {totalOz32BagsSold}
               </div>
            </div>

             {/* Purchases Summary */}
             <h4 className="font-semibold text-lg mt-4 border-b pb-1">Resumen de Compras</h4>
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <label htmlFor="bagRollsDisplay" className="text-right font-medium">
                Rollos Comprados:
              </label>
               <div id="bagRollsDisplay" className="p-2 border rounded-md bg-muted text-right">
                 {totalBagRollsPurchased}
               </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <label htmlFor="waterBottlesDisplay" className="text-right font-medium">
                Agua Comprada (Botellas):
              </label>
               <div id="waterBottlesDisplay" className="p-2 border rounded-md bg-muted text-right">
                 {totalWaterBottlesPurchased}
               </div>
            </div>

            {/* Financial Calculation */}
             <div className="mt-6 border-t pt-4 grid gap-3"> {/* Increased spacing */}
                 <div className="flex justify-between items-center">
                    <span className="font-medium">Ingresos Totales:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(totalRevenue)}</span>
                 </div>
                 <div className="flex justify-between items-center">
                     <span className="font-medium">Gastos Totales:</span>
                     <span className="font-semibold text-red-700">{formatCurrency(totalExpenses)}</span>
                 </div>
                 <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span className="text-xl font-bold">Ganancia Neta:</span> {/* Made larger */}
                    <span className={`text-xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}> {/* Made larger */}
                        {formatCurrency(profit)}
                    </span>
                 </div>
             </div>

          </div>
        </CardContent>
      </Card>
      <Link href="/" className="mt-6"> {/* Increased margin */}
        <Button variant="secondary">Regresar al Inicio</Button>
      </Link>
    </div>
  );
}
