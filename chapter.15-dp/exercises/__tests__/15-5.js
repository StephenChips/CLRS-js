import { describe, it, expect } from "@jest/globals";
import { computeEditDistance } from "../15-5";

const COST = Object.freeze({
    KILL: 1,
    REPLACE: 1,
    DELETE: 1,
    COPY: 1,
    TWIDDLE: 1,
    INSERT: 1
});


const DNA_SEQUENCE_ALIGNMENT_CONFIG = {
    COPY: -1,
    DELETE: 2,
    INSERT: 2,
    TWIDDLE: Number.POSITIVE_INFINITY,
    REPLACE: 1,
    KILL: Number.POSITIVE_INFINITY
};

describe("Edit distance", () => {
    it("test case #1 (from the textbook)", () => {
        const editDistance = computeEditDistance("algorithm", "altruistic", COST);
        expect(editDistance.editDistance).toBe(10);
        expect(editDistance.editSequence).toEqual([
            'insert a',
            'insert l',
            'replace a with t',
            'replace l with r',
            'replace g with u',
            'replace o with i',
            'replace r with s',
            'twiddle i and t',
            'insert c',
            'kill'
        ])
    });

    it("test case #2", () => {
        const { editDistance, editSequence } = computeEditDistance("cat", "cut", COST);
        expect(editDistance).toBe(3);
        expect(editSequence).toEqual([
            "copy c",
            "replace a with u",
            "copy t"
        ]);
    });

    it("test case #3", () => {
        // Let the algorithm prefer DELETE over KILL by cranking up the cost of KILL
        // and make the COPY zero-cost so that it can produce an intuitive solution.

        const result = computeEditDistance(
            "TimeAndRelationalDimensionInSpace",
            "TARDIS",
            { ...COST, KILL: 100, COPY: 0 }
        );

        expect(result).toEqual({
            editDistance: 27,
            editSequence: [
                'copy T', 'delete i', 'delete m',
                'delete e', 'copy A', 'delete n',
                'delete d', 'copy R', 'delete e',
                'delete l', 'delete a', 'delete t',
                'delete i', 'delete o', 'delete n',
                'delete a', 'delete l', 'copy D',
                'delete i', 'delete m', 'delete e',
                'delete n', 'delete s', 'delete i',
                'delete o', 'delete n', 'copy I',
                'delete n', 'copy S', 'delete p',
                'delete a', 'delete c', 'delete e'
            ]
        });
    });

    it("test case #4: Question 15-5.b", () => {
        /**
         *  Explain how to cast the problem of finding an optimal alignment as an edit distance
         *  problem using a subset of the transformation operations copy, replace, delete, insert
         *  twiddle, and kill.
         */

        const result = computeEditDistance(
            "GATCGGCAT",
            "CAATGTGAATC",
            DNA_SEQUENCE_ALIGNMENT_CONFIG
        );

        expect(result).toEqual({
            editDistance: 3,
            editSequence: [
                "insert C",
                "replace G with A",
                "copy A",
                "copy T",
                "replace C with G",
                "replace G with T",
                "copy G",
                "replace C with A",
                "copy A",
                "copy T",
                "insert C"
            ]
        });
    });
});
