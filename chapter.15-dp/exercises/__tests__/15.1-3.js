import { describe, it, expect } from "@jest/globals";
import { rodCuttingWithCost } from "../15.1-3";

describe("rodCuttingWithCost", () => {
    it("should run", () => {
        expect(rodCuttingWithCost(4, [0, 3, 6], 2)).toBe(10);
        expect(rodCuttingWithCost(4, [0, 1, 5, 8, 9, 10], 2)).toBe(9);
        expect(rodCuttingWithCost(4, [0, 1, 5, 8, 9, 10], 0)).toBe(10);
    });
});