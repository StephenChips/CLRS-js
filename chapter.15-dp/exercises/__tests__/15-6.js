import { describe, it, expect } from "@jest/globals"
import { bestGuests } from "../15-6.js";

import {  } from "@jest/expect-utils";

describe("Planning a comany party", () => {
    // Assume that the boss can be absent.
    it("test case #1: The boss does not join the party", () => {
        const ans = bestGuests({
            name: "Boss A",
            score: 1,
            subordinates: [
                {
                    name: "Manager B",
                    score: 5,
                    subordinates: [
                        {
                            name: "Waiter E",
                            score: 10,
                        }
                    ]
                },
                {
                    name: "Manager C",
                    score: 2,
                    subordinates: [
                        {
                            name: "Waiter F",
                            score: 20
                        }
                    ]
                },
                {
                    name: "Manager D",
                    score: 5
                }
            ]
        });

        expect(ans).toEqual({
            maxConviviality: 35,
            participants: new Set([
                "Waiter E#10",
                "Waiter F#20",
                "Manager D#5"
            ])
        });
    });

    it("test case #2: The boss joins the party.", () => {
        const ans = bestGuests({
            name: "Boss Winston",
            score: 100,
            subordinates: [
                {
                    name: "Manager Anderson",
                    score: 50,
                    subordinates: [
                        {
                            name: "Waiter Fisher",
                            score: 20
                        },
                        {
                            name: "Waiter Ohm",
                            score: 20
                        }
                    ]
                }
            ]
        });

        expect(ans).toEqual({
            maxConviviality: 140,
            participants: new Set([
                "Boss Winston#100",
                "Waiter Ohm#20",
                "Waiter Fisher#20"
            ])
        });
    });

    it("tst case #3: Multiple optimal solutions", () => {
        const ans = bestGuests({
            name: "Boss Winston",
            score: 80,
            subordinates: [
                {
                    name: "Manager Anderson",
                    score: 50,
                    subordinates: [
                        {
                            name: "Waiter Fisher",
                            score: 10
                        }
                    ]
                },
                {
                    name: "Manager Hacker",
                    score: 50,
                    subordinates: [
                        {
                            name: "Waiter Peterson",
                            score: 10
                        }
                    ]
                }
            ]
        });

        expect(ans.maxConviviality).toBe(100);

        /**
         * This hierarchy has two optimal solution. Both's max conviviality sum
         * is equals to 100.
         */
        expect([
            new Set([
                "Boss Winston#80",
                "Waiter Peterson#10",
                "Waiter Fisher#10"
            ]),
            new Set([
                "Manager Haker#50",
                "Manager Anderson#50"
            ])
        ]).toContainEqual(ans.participants);
    });
});
