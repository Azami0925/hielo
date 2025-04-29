"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SalesPage() {
  const [bagsSold, setBagsSold] = useState(0);
  const [salesHistory, setSalesHistory] = useState<number[]>([]);

  const bagPrice = 8; // Precio por bolsa
  const rollPrice = 200; // Precio por rollo de bolsas
  const waterPrice = 24; // Precio por botella de agua

  useEffect(() => {
    // Cargar el historial de ventas desde el almacenamiento local al montar el componente
    const storedHistory = localStorage.getItem("salesHistory");
    if (storedHistory) {
      setSalesHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    // Guardar el historial de ventas en el almacenamiento local cada vez que cambie
    localStorage.setItem("salesHistory", JSON.stringify(salesHistory));
  }, [salesHistory]);


  const handleRecordSale = () => {
    const saleAmount = bagsSold > 0 ? bagsSold : 0; // Ensure non-negative sales
    if (saleAmount > 0) {
        setSalesHistory([...salesHistory, saleAmount]);
        console.log(`${saleAmount} bolsas de hielo vendidas`);
        setBagsSold(0); // Reset input field
    } else {
        console.log("Ingrese un número válido de bolsas vendidas.");
        // Optionally, show a user-friendly message here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 relative z-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registrar Ventas de Bolsas de Hielo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2 items-center grid-cols-[auto_1fr]"> {/* Align label and input */}
              <label htmlFor="bagsSold" className="text-right">
                Bolsas Vendidas:
              </label>
              <Input
                type="number"
                id="bagsSold"
                value={bagsSold === 0 ? "" : bagsSold} // Show placeholder when 0
                onChange={(e) => setBagsSold(parseInt(e.target.value) || 0)} // Handle NaN
                placeholder="Ingrese número de bolsas"
                min="0" // Prevent negative numbers
              />
            </div>
            <Button onClick={handleRecordSale}>Registrar Venta</Button>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Historial de Ventas:</h3> {/* Improved heading */}
              {salesHistory.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 max-h-48 overflow-y-auto"> {/* Added scroll */}
                  {salesHistory.map((sale, index) => (
                    <li key={index}>Venta {index + 1}: {sale} bolsas</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No hay ventas registradas.</p> /* Message for empty history */
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Link href="/" className="mt-4"> {/* Add margin to the button */}
        <Button variant="secondary">Regresar</Button>
      </Link>
    </div>
  );
}
