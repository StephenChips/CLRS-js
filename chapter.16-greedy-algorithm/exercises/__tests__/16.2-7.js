import { describe, it, expect } from "@jest/globals";
import { twoArrayMaxProduct } from "../16.2-7";

describe("two arrays' maximum product", () => {
    it("test case #1", () => {
        expect(twoArrayMaxProduct(
            [6n, 2n, 9n],
            [1n, 3n, 4n]
        )).toBe(2834352n)
    });
});
