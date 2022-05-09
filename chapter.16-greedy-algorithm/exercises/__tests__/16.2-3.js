import { expect, it, describe } from "@jest/globals";
import { zeroOneKnapsack } from "../16.2-3";

/**
 * 
 */

describe("0-1 knapspack problem: the lighter item is more valuable", () => {
    it("test case #1", () => {
        const solution = zeroOneKnapsack([
            { weight: 10, value: 100 },
            { weight: 50, value: 80 },
            { weight: 70, value: 30 },
            { weight: 100, value: 10 }
        ], 100);

        expect(solution).toEqual([
            { weight: 10, value: 100 },
            { weight: 50, value: 80 }
        ]);
    });
});
