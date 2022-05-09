import { describe, it, expect } from "@jest/globals";
import { zeroOneKnapsack } from "../16.2-2.js";

describe("0-1 knapsack problem", () => {
    it("test case #1", () => {
        const result = zeroOneKnapsack([
            { weight: 10, price: 60 },
            { weight: 20, price: 100 },
            { weight: 30, price: 120 }
        ], 50);

        result.sort(a => b => a.weight - b.weight);

        expect(result).toEqual([
            { weight: 20, price: 100 },
            { weight: 30, price: 120 }
        ]);
    });

    it("test case #2", () => {
        const solution = zeroOneKnapsack([
            { weight: 10, price: 100 },
            { weight: 50, price: 80 },
            { weight: 70, price: 30 },
            { weight: 100, price: 10 }
        ], 100);

        expect(solution).toEqual([
            { weight: 10, price: 100 },
            { weight: 50, price: 80 }
        ]);
    });
});