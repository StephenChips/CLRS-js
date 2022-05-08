import { describe, it, expect } from "@jest/globals";
import { zeroOneKnapsack } from "../16.2-2.js";

describe("0-1 knapsack problem", () => {
    it("test case #1", () => {
        const result = zeroOneKnapsack([
            { weight: 10, price: 60 },
            { weight: 20, price: 100 },
            { weight: 30, price: 120 }
        ], 50);

        result.sort(a => b => a.weight > b.weight);

        expect(result).toEqual([
            { weight: 20, price: 100 },
            { weight: 30, price: 120 }
        ]);
    });
});