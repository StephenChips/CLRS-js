import { describe, it, expect } from "@jest/globals";
import { maxRevenue, rodCuttingSolution } from "../rod-cutting";    

describe("maxRevenue", () => {
    it("The textbook example", () => {
        const prices = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
        expect(maxRevenue(4, prices)).toBe(10);
    });
});

describe("rodCuttingSolution", () => {
    it("The textbook example", () => {
        const prices = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
        expect(rodCuttingSolution(4, prices)).toEqual({
            maxRevenue: 10,
            solution: [2, 2]
        });
    });
});