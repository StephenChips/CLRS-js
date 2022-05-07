import { describe, it } from "@jest/globals";
import { minimumMultiplicationTimes } from "../min-mul-times";

describe("minimumMultiplicationTimes", () => {
    it("sameple test case", () => {
        const minMulTime = minimumMultiplicationTimes([
            { row: 10, col: 100 },
            { row: 100, col: 5 },
            { row: 5, col: 50 }
        ]);
    
        expect(minMulTime).toBe(7500);
    });
});
