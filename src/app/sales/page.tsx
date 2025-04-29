"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Added CardDescription
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define the structure for a single sale entry
interface SaleEntry {
    standardBags: number;
    oz32Bags: number;
    timestamp: number; // Add timestamp for potential future sorting/filtering
}

export default function SalesPage() {
  // State for current input values
  const [bagsSold, setBagsSold] = useState({ standard: 0, oz32: 0 });
  // State for sales history
  const [salesHistory, setSalesHistory] = useState<SaleEntry[]>([]);

  // Prices (could be moved to a config file later)
  const standardBagPrice = 8; // Precio por bolsa estándar
  const oz32BagPrice = 6; // Precio por bolsa de 32 oz

  // Load sales history from localStorage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem("salesHistory");
    if (storedHistory) {
        try {
            const parsedHistory = JSON.parse(storedHistory);
            // Validate the loaded data structure
            if (Array.isArray(parsedHistory) && parsedHistory.every(item =>
                typeof item === 'object' &&
                item !== null && // Ensure item is not null
                typeof item.standardBags === 'number' &&
                typeof item.oz32Bags === 'number' &&
                typeof item.timestamp === 'number' // Check for timestamp
            )) {
                setSalesHistory(parsedHistory);
            } else {
                console.error("Invalid sales history format found in localStorage. Resetting.");
                localStorage.removeItem("salesHistory"); // Clear invalid data
            }
        } catch (error) {
            console.error("Failed to parse sales history from localStorage:", error);
            localStorage.removeItem("salesHistory"); // Clear corrupted data
        }
    }
  }, []);

  // Save sales history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("salesHistory", JSON.stringify(salesHistory));
  }, [salesHistory]);


  const handleRecordSale = () => {
    // Ensure at least one bag type has a positive quantity
    const standardAmount = bagsSold.standard > 0 ? bagsSold.standard : 0;
    const oz32Amount = bagsSold.oz32 > 0 ? bagsSold.oz32 : 0;

    if (standardAmount > 0 || oz32Amount > 0) {
        const newSale: SaleEntry = {
            standardBags: standardAmount,
            oz32Bags: oz32Amount,
            timestamp: Date.now() // Record the time of the sale
        };
        setSalesHistory([...salesHistory, newSale]);
        console.log(`Venta registrada: ${standardAmount} bolsas estándar, ${oz32Amount} bolsas 32oz`);
        setBagsSold({ standard: 0, oz32: 0 }); // Reset input fields
    } else {
        console.log("Ingrese un número válido de bolsas vendidas para al menos un tipo.");
        // Optionally, show a user-friendly message (e.g., using a toast)
    }
  };

  // Helper to format date from timestamp
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('es-MX');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 relative z-10">
      <Card className="w-full max-w-lg"> {/* Increased max-width slightly */}
        <CardHeader>
          <CardTitle>Registrar Ventas de Bolsas de Hielo</CardTitle>
          <CardDescription>Ingrese la cantidad vendida para cada tipo de bolsa.</CardDescription> {/* Added description */}
        </CardHeader>
        <CardContent>
          <div className="grid gap-6"> {/* Increased gap */}
            {/* Standard Bags Input */}
            <div className="grid gap-2 items-center grid-cols-[auto_1fr]">
              <label htmlFor="standardBagsSold" className="text-right font-medium">
                Bolsas Estándar ({standardBagPrice} MXN):
              </label>
              <Input
                type="number"
                id="standardBagsSold"
                value={bagsSold.standard === 0 ? "" : bagsSold.standard}
                onChange={(e) => setBagsSold({ ...bagsSold, standard: parseInt(e.target.value) || 0 })}
                placeholder="Cantidad"
                min="0"
              />
            </div>

            {/* 32 oz Bags Input */}
            <div className="grid gap-2 items-center grid-cols-[auto_1fr]">
              <label htmlFor="oz32BagsSold" className="text-right font-medium">
                Bolsas 32oz ({oz32BagPrice} MXN):
              </label>
              <Input
                type="number"
                id="oz32BagsSold"
                value={bagsSold.oz32 === 0 ? "" : bagsSold.oz32}
                onChange={(e) => setBagsSold({ ...bagsSold, oz32: parseInt(e.target.value) || 0 })}
                placeholder="Cantidad"
                min="0"
              />
            </div>

            <Button onClick={handleRecordSale} className="w-full">Registrar Venta</Button>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Historial de Ventas:</h3>
              {salesHistory.length > 0 ? (
                <div className="max-h-60 overflow-y-auto border rounded-md p-2 bg-muted/50"> {/* Scrollable container */}
                  <ul className="space-y-2">
                    {salesHistory.slice().reverse().map((sale, index) => ( // Show newest first
                      <li key={sale.timestamp} className="text-sm border-b pb-1 last:border-b-0">
                        Venta #{salesHistory.length - index}: {sale.standardBags > 0 ? `${sale.standardBags} Estándar` : ''}{sale.standardBags > 0 && sale.oz32Bags > 0 ? ', ' : ''}{sale.oz32Bags > 0 ? `${sale.oz32Bags} 32oz` : ''}
                        <span className="block text-xs text-muted-foreground">{formatDate(sale.timestamp)}</span>
                      </li>
                    ))}
                  </ul>
                 </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No hay ventas registradas.</p>
              )}
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
