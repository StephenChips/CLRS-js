import { expect, it, describe } from "@jest/globals";
import { printNeatly } from "../15-3";

describe("printNeatly", () => {
    it("normal cases: repeated 'a's", () => {
        expect(printNeatly(["a", "a", "a", "a", "a", "a", "a", "a", "a"], 5)).toEqual({
            spaceCubeSum: 0,
            result: [
                ["a", "a", "a"],
                ["a", "a", "a"],
                ["a", "a", "a"]
            ]
        });
    });

    it("normal case #2: The quick brown fox", () => {
        expect(printNeatly(["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"], 9)).toEqual({
            spaceCubeSum: 65,
            result: [
                ["The", "quick"],
                ["brown", "fox"],
                ["jumps"],
                ["over", "the"],
                ["lazy", "dog"]
            ]
        });
    });

    it("normal case #3: Lorem ipsum", () => {
        expect(printNeatly(
            ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed',
                'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua',
                'Ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco',
                'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat'
            ], 100)).toEqual({
                result: [
                    [
                        "Lorem",
                        "ipsum",
                        "dolor",
                        "sit",
                        "amet",
                        "consectetur",
                        "adipiscing",
                        "elit",
                        "sed",
                        "do",
                        "eiusmod",
                        "tempor",
                        "incididunt",
                        "ut",
                        "labore",
                    ],
                    [
                        "et",
                        "dolore",
                        "magna",
                        "aliqua",
                        "Ut",
                        "enim",
                        "ad",
                        "minim",
                        "veniam",
                        "quis",
                        "nostrud",
                        "exercitation",
                        "ullamco",
                        "laboris",
                        "nisi",
                        "ut",
                    ],
                    [
                        "aliquip",
                        "ex",
                        "ea",
                        "commodo",
                        "consequat",
                    ],
                ],
                spaceCubeSum: 91,
            })
    });

    it("impossible cases: word is too long to fit into one line.", () => {
        expect(printNeatly(["Supercalifragilisticexpialidocious"], 5)).toBeNull();
    });
});