import { expect, it, describe } from "@jest/globals";
import { minUnitInterval } from "../16.2-5";

describe("Minimum number of unit interval", () => {
    it("test case #1", () => {
        expect(minUnitInterval([
            1,2,4,5,6
        ])).toEqual([
            [1, 2],
            [4, 5],
            [6, 7]
        ])
    });

    it("test case #2", () => {
        expect(minUnitInterval([
            1, 1.1, 1.5, 1.8, 1.89, 1.99, 2, 2.1, 2.9, 3.1
        ])).toEqual([
            [1, 2],
            [2.1, 3.1]
        ]);
    });
});
