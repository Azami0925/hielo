
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      `Purchased ${bagRollsPurchased} bag rolls and ${waterBottlesPurchased} water bottles`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Record Raw Material Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="bagRolls" className="text-right inline-block w-32">
                Bag Rolls Purchased:
              </label>
              <Input
                type="number"
                id="bagRolls"
                value={bagRollsPurchased}
                onChange={(e) => setBagRollsPurchased(parseInt(e.target.value))}
                placeholder="Enter number of bag rolls"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="waterBottles"
                className="text-right inline-block w-32"
              >
                Water Bottles Purchased:
              </label>
              <Input
                type="number"
                id="waterBottles"
                value={waterBottlesPurchased}
                onChange={(e) => setWaterBottlesPurchased(
                  parseInt(e.target.value)
                )}
                placeholder="Enter number of water bottles"
              />
            </div>

            <Button onClick={handleRecordPurchase}>Record Purchase</Button>

            <div className="mt-4">
              <h3>Purchases History:</h3>
              <ul>
                {purchasesHistory.map((purchase, index) => (
                  <li key={index}>
                    Purchase {index + 1}: {purchase.bagRolls} bag rolls,{" "}
                    {purchase.waterBottles} water bottles
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
