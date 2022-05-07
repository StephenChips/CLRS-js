import { describe, it, expect } from "@jest/globals";
import { createOBST, obstCostBruteForce, word } from "../optimal-bst";

describe("obstCostBruteForce: The brute-force version of finding obst", () => {
    it("correct cases", () => {
        expect(
            obstCostBruteForce(
                [0.9, 0.02, 0.04],
                [0.01, 0.01, 0.01, 0.01]
            )
        ).toBeCloseTo(1.17);
    });
});

describe("createOBST: Compute the minimum cost of a obst", () => {
    it("correct cases", () => {
        let obst = createOBST(
            [0.9, 0.02, 0.04],
            [0.01, 0.01, 0.01, 0.01]
        );

        expect(obst.cost).toBeCloseTo(1.17);
        expect(obst.obst).toEqual(
            word(
                0,
                null,
                word(
                    2,
                    word(1),
                    null
                ),
            )
        );

        obst = createOBST(
            [0.2],
            [0.4, 0.4]
        );

        expect(obst.cost).toBeCloseTo(1.8);

        expect(obst.obst).toStrictEqual(word(0));

        obst = createOBST(
            [0.15, 0.10, 0.05, 0.10, 0.20],
            [0.05, 0.10, 0.05, 0.05, 0.05, 0.10]
        );

        expect(obst.cost).toBe(2.75);
    });
});
