import { describe, it, expect } from "@jest/globals";
import { reversedPostDFS, shortestPathDP } from "../15-1.js";

const graph = [
    [
        { weight: 1, to: 1 },
        { weight: 2, to: 2 }
    ],
    [
        { weight: 6, to: 3 }, 
        { weight: 5, to: 4 }
    ],
    [
        { weight: 3, to: 1 },
        { weight: 4, to: 4 }
    ],
    [
        { weight: 8, to: 5 }
    ],
    [
        { weight: 7, to: 5 }
    ],
    []
];

describe("reversedPostDFS", () => {
    it("valid cases", () => {
        expect(reversedPostDFS(graph, 0)).toEqual([
            5, 3, 4, 1, 2, 0
        ]);

        expect(reversedPostDFS(graph, 3)).toEqual([5, 3]);
    });
});

describe("shortestPathDP", () => {
    expect(shortestPathDP(graph, 0, 5)).toEqual({
        path: [0, 1, 4, 5],
        weight: 13
    });
    expect(shortestPathDP(graph, 2, 5)).toEqual({
        path: [2, 4, 5],
        weight: 11
    });
    expect(shortestPathDP(graph, 5, 2)).toEqual({
        path: [],
        weight: Number.POSITIVE_INFINITY
    });
    expect(shortestPathDP(graph, 3, 4)).toEqual({
        path: [],
        weight: Number.POSITIVE_INFINITY
    });
})
